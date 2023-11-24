import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import {
  CurrentUser,
  DBFavouriteTrack,
  DBLibraryPlaylist,
  PlaylistData,
} from "@/app/recoil/atoms";
import { checkTokenTime, generateCustomPlaylistID } from "./utils";
import { TrackObject } from "@/app/playlist/components/Track/Track";

// Fetches and return a single track from Spotify API
const fetchTrack = async (id: string) => {
  await checkTokenTime();
  const accessToken = localStorage.getItem("access_token");
  let track: TrackObject | undefined = undefined;

  try {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching playlist: ${response.status}`);
    }
    const data = await response.json();
    track = data;
  } catch (error) {
    console.error("Error fetching track" + error);
  }

  return track;
};

//Fetches and return a single  playlist from Spotify API
const fetchPlaylist = async (id: string) => {
  await checkTokenTime();
  const accessToken = localStorage.getItem("access_token");
  let playlist: PlaylistData | undefined = undefined;

  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching playlist: ${response.status}`);
    }
    const data = await response.json();
    playlist = data;
  } catch (error) {
    console.error("Error fetching playlist" + error);
  }

  return playlist;
};

//fetching a list of favourite tracks from db
export const getFavouriteTracksForUser = async (userId: string) => {
  const favoriteTracksRef = collection(db, "users", userId, "favourite_tracks");
  const querySnapshot = await getDocs(favoriteTracksRef);
  const arrayWithFavouriteTracks: DBFavouriteTrack[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.data().spotify_id !== "11111111") {
      arrayWithFavouriteTracks.push(doc.data() as DBFavouriteTrack);
    }
  });

  const tracksList: Array<{ track: TrackObject }> = [];
  if (arrayWithFavouriteTracks.length > 0) {
    for (const track of arrayWithFavouriteTracks) {
      const trackObject = await fetchTrack(track.spotify_id); // Await here
      if (trackObject) {
        tracksList.push({ track: trackObject });
      }
    }
  }

  return tracksList;
};

//fetching a list of playlists from library
export const getPlaylistsFromLibraryForUser = async (userId: string) => {
  const playlistsFromLibraryRef = collection(db, "users", userId, "library");
  const querySnapshot = await getDocs(playlistsFromLibraryRef);
  const arrayWithPlaylistsFromLibrary: DBLibraryPlaylist[] = [];

  querySnapshot.forEach((doc) => {
    //check if it's not fake playlist
    if (doc.data().custom_id !== "11111111") {
      arrayWithPlaylistsFromLibrary.push(doc.data() as DBLibraryPlaylist);
    }
  });

  const libraryPlaylists: PlaylistData[] = [];

  //we need to fetch data about playlist. and then to create a tracks array and fetch tracks
  if (arrayWithPlaylistsFromLibrary.length > 0) {
    for (const playlist of arrayWithPlaylistsFromLibrary) {
      const tracksList: Array<{ track: TrackObject }> = [];
      if (playlist.tracks.length > 0) {
        for (const track of playlist.tracks) {
          const trackObject = await fetchTrack(track);
          if (trackObject) {
            tracksList.push({ track: trackObject });
          }
        }
      }

      const libraryPlaylistData: PlaylistData = {
        name: playlist.name,
        description: "Custom playlist",
        id: playlist.custom_id,
        images: [],
        tracks: {
          total: tracksList.length,
          items: tracksList,
        },
      };

      libraryPlaylists.push(libraryPlaylistData);
    }
  }

  return libraryPlaylists;
};

//fetching one playlist from library
export const getOnePlaylistFromLibraryForUser = async (
  userId: string,
  playlistId: string
) => {
  const playlistsFromLibraryRef = collection(db, "users", userId, "library");
  const querySnapshot = await getDocs(playlistsFromLibraryRef);
  const arrayWithPlaylistsFromLibrary: DBLibraryPlaylist[] = [];

  querySnapshot.forEach((doc) => {
    arrayWithPlaylistsFromLibrary.push(doc.data() as DBLibraryPlaylist);
  });

  const findPlaylistByCustomId = (
    customId: string
  ): DBLibraryPlaylist | undefined => {
    return arrayWithPlaylistsFromLibrary.find(
      (playlist) => playlist.custom_id === customId
    );
  };

  const foundPlaylist = findPlaylistByCustomId(playlistId);
  let playlist: PlaylistData | undefined = undefined;

  if (foundPlaylist) {
    const tracksList: Array<{ track: TrackObject }> = [];
    if (foundPlaylist.tracks.length > 0) {
      for (const track of foundPlaylist.tracks) {
        const trackObject = await fetchTrack(track);
        if (trackObject) {
          tracksList.push({ track: trackObject });
        }
      }
    }

    playlist = {
      name: foundPlaylist.name,
      description: "Custom playlist",
      id: foundPlaylist.custom_id,
      images: [],
      tracks: {
        total: tracksList.length,
        items: tracksList,
      },
    };
  }

  return playlist;
};

export const removePlaylistFromLibrary = async (
  userId: string,
  playlistId: string
) => {
  const libraryRef = collection(db, "users", userId, "library");

  const q = query(libraryRef, where("custom_id", "==", playlistId));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("Document successfully deleted!");
    });
    return true;
  } catch (error) {
    console.error("Error removing playlist:", error);
    return false;
  }
};

//Add user data to db
export const addUserToDatabase = async (user: CurrentUser) => {
  const usersCollection = collection(db, "users");

  try {
    const userDocRef = doc(usersCollection, user.id); // Use user's ID as the document ID
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      console.log("User already exists in database. Not adding again.");
    } else {
      // User doesn't exist, add the user to database
      await setDoc(userDocRef, {
        image: user.image,
        name: user.name,
        surname: user.surname,
        email: user.email,
        type: user.type,
      });

      // Create empty collections for the user
      const favouriteTracksRef = collection(userDocRef, "favourite_tracks");
      const libraryRef = collection(userDocRef, "library");

      //Create fake objects
      const fakeFavouriteTrack: DBFavouriteTrack = {
        spotify_id: "11111111",
      };

      const fakeLibraryPlaylist: DBLibraryPlaylist = {
        name: "",
        custom_id: "11111111",
        tracks: [],
      };

      // Add empty documents to the collections with custom IDs
      await setDoc(
        doc(favouriteTracksRef, fakeFavouriteTrack.spotify_id),
        fakeFavouriteTrack
      );
      await setDoc(
        doc(libraryRef, fakeLibraryPlaylist.custom_id),
        fakeLibraryPlaylist
      );

      console.log(
        "User data and empty collections added to database successfully!"
      );
    }
  } catch (error) {
    console.error(
      "Error checking/adding user data and collections in database:",
      error
    );
  }
};

export const createPlaylist = async (
  userId: string,
  playlist: DBLibraryPlaylist
): Promise<boolean> => {
  try {
    const libraryCollectionRef = collection(db, "users", userId, "library");
    // Add a new document with auto-generated ID in the library collection
    await addDoc(libraryCollectionRef, playlist);
    console.log("Playlist created in the library successfully!");
    return true;
  } catch (error) {
    console.error("Error creating playlist:", error);
    return false;
  }
};

//create an empty playlist with specific name in db
export const createEmptyPlaylistWithName = async (
  userId: string,
  playlistName: string
): Promise<boolean> => {
  try {
    const libraryCollectionRef = collection(db, "users", userId, "library");

    const id = generateCustomPlaylistID();
    const newPlaylist: DBLibraryPlaylist = {
      name: playlistName,
      custom_id: id,
      tracks: [],
    };

    await addDoc(libraryCollectionRef, newPlaylist);

    console.log("Empty playlist created successfully in Firestore!");
    return true;
  } catch (error) {
    console.error("Error creating empty playlist:", error);
    return false;
  }
};

export const checkIfPlaylistNameExists = async (
  userId: string,
  playlistName: string
): Promise<boolean> => {
  try {
    const libraryCollectionRef = collection(db, "users", userId, "library");

    // Query for playlists in the library with the same name
    const querySnapshot = await getDocs(
      query(libraryCollectionRef, where("name", "==", playlistName))
    );

    // Check if there are any playlists with the same name
    if (!querySnapshot.empty) {
      return true; // Playlist with the same name exists
    } else {
      return false; // Playlist with the same name does not exist
    }
  } catch (error) {
    console.error("Error checking playlist existence:", error);
    return false; // Return false on error
  }
};
