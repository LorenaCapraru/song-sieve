import Image from "next/image";
import { ChangeEvent, useState } from "react";
import "./Input.css";
import {
  inputSpotifyIdState,
  inputSpotifyLinkState,
  isGetPlaylistButtonClickedState,
  playlistDataState,
} from "@/app/recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { PlaylistData } from "@/app/recoil/atoms";
import { checkTokenTime } from "@/utils/utils";

const Input = () => {
  const [inputSpotifyLink, setInputSpotifyLink] = useRecoilState(
    inputSpotifyLinkState
  );
  const [inputSpotifyId, setInputSpotifyId] =
    useRecoilState(inputSpotifyIdState);
  const [inputErrMsg, setInputErrMsg] = useState<string>("");
  const [fetchErrMsg, setFetchErrMsg] = useState<string>("");
  const [playlistData, setPlaylistData] = useRecoilState<
    PlaylistData | undefined
  >(playlistDataState);
  const setIsGetPlaylistButtonClicked = useSetRecoilState(
    isGetPlaylistButtonClickedState
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaylistData(undefined);
    setInputErrMsg("");
    const link = e.target.value;

    if (link.trim() === "") {
      setInputErrMsg("The link is empty.");
    } else if (!link.trim().startsWith("https://open.spotify.com/playlist/")) {
      setInputErrMsg(
        "The link should start with 'https://open.spotify.com/playlist/'."
      );
    }

    setInputSpotifyLink(link);

    const id = link.replace("https://open.spotify.com/playlist/", "");
    setInputSpotifyId(id);
  };

  const fetchPlaylist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await checkTokenTime();
    const accessToken = localStorage.getItem("access_token");
    setFetchErrMsg("");

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${inputSpotifyId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setFetchErrMsg("Playlist not found. Please check the ID.");
        } else if (response.status === 401) {
          setFetchErrMsg("Unauthorized. Please check your access.");
        } else {
          setFetchErrMsg(
            `Error fetching playlist: ${response.status}. Please try again.`
          );
        }
        throw new Error(`Error fetching playlist: ${response.status}`);
      }

      const data = await response.json();
      setPlaylistData(data);
      setIsGetPlaylistButtonClicked(true);
      console.log("Playlist Data:", data);
    } catch (error) {
      console.error("Error fetching playlist" + error);
    }
  };

  return (
    <>
      <form onSubmit={fetchPlaylist}>
        <div className="input-section">
          <Image
            src="/icons/spotify-icon.svg"
            alt="spotify brand"
            width={16}
            height={16}
            className="icon"
          />
          <input
            type="text"
            value={inputSpotifyLink}
            onChange={handleChange}
            placeholder="Spotify playlist link"
            className="input-field"
          />
          {inputErrMsg.length > 0 && <p className="error-msg">{inputErrMsg}</p>}
        </div>
        <div className="submit-button-section">
          <button className="submit-button" type="submit">
            GET THE PLAYLIST
          </button>
        </div>
      </form>
      {fetchErrMsg.length > 0 && <p className="error-msg">{fetchErrMsg}</p>}
    </>
  );
};

export default Input;
