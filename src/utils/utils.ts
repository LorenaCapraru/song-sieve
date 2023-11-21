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
