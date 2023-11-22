import { TrackObject } from "@/app/playlist/components/Track/Track";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
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

export const shortenString = (input: string, maxLength: number): string => {
  if (input.length > maxLength) {
    return input.substring(0, maxLength) + "...";
  }

  return input;
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
    arrayWithFavouriteTracks.push(doc.data() as DBFavouriteTrack);
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

//fetching a list of favourite tracks from db
export const getPlaylistsFromLibraryForUser = async (userId: string) => {
  const playlistsFromLibraryRef = collection(db, "users", userId, "library");
  const querySnapshot = await getDocs(playlistsFromLibraryRef);
  const arrayWithPlaylistsFromLibrary: DBLibraryPlaylist[] = [];

  querySnapshot.forEach((doc) => {
    arrayWithPlaylistsFromLibrary.push(doc.data() as DBLibraryPlaylist);
  });

  console.log("arrayWithPlaylistsFromLibrary", arrayWithPlaylistsFromLibrary);

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

      console.log("pid", playlist.spotify_id);
      //fetch info about all playlists
      let playlistSpotifyObject: PlaylistData | undefined = undefined;

      if (playlist.spotify_id !== "custom_playlist") {
        playlistSpotifyObject = await fetchPlaylist(playlist.spotify_id);
      }

      const libraryPlaylistData: PlaylistData = {
        name: playlist.name,
        description: "Custom playlist",
        id: playlist.spotify_id,
        images: playlistSpotifyObject ? playlistSpotifyObject.images : [],
        tracks: {
          total: tracksList.length,
          items: tracksList,
        },
      };

      libraryPlaylists.push(libraryPlaylistData);
    }
  }

  console.log("libraryPlaylists", libraryPlaylists);

  return libraryPlaylists;
};
