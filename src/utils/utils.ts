import { TrackObject } from "@/app/playlist/components/Track/Track";
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

const getAccessToken = async () => {
  const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

  if (!refresh_token) return;

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });
    const data = await response.json();
    const accessToken = data.access_token;
    const currentTime = Date.now();
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("token_timestamp", currentTime.toString());
  } catch (error) {
    console.log("Error in getting access token", error);
  }
};

export const checkTokenTime = async () => {
  const storedTime = localStorage.getItem("token_timestamp");
  if (storedTime) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - parseInt(storedTime, 10);
    const tokenExpiresIn = 3600 * 1000;

    if (elapsedTime > tokenExpiresIn) {
      await getAccessToken();
    }
  } else {
    //it there is no time in storage => it means we calling it for the first time
    await getAccessToken();
  }
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const millisecondsToMinutes = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${formattedSeconds}`;
};
export const shortenString = (input: string, maxLength: number): string => {
  if (input.length > maxLength) {
    return input.substring(0, maxLength) + "...";
  }
  return input;
};

export const getIdFromLibraryPlaylistUrl = (inputString: string) => {
  const parts = inputString.split("/");
  return parts[parts.length - 1];
};

export const convertToSnakeCase = (input: string): string => {
  return input.toLowerCase().replace(/\s/g, "_");
};

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

export const generateCustomPlaylistID = (): string => {
  const min = 10000000;
  const max = 99999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const id = `custom_playlist_${randomNumber}`;
  return id;
};

// Function to extract only the spotify_id from an array of TrackObjects
export const extractSpotifyIds = (trackObjects: TrackObject[]): string[] => {
  return trackObjects.map((trackObject) => trackObject.id);
};

export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 100);
};
