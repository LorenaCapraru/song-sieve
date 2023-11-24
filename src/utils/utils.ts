import { TrackObject } from "@/app/playlist/components/Track/Track";

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
