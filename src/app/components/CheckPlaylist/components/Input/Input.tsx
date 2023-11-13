import Image from "next/image";
import { useState, ChangeEvent } from "react";
import "./Input.css";
import {
  inputSpotifyIdState,
  inputSpotifyLinkState,
  playlistDataState,
} from "@/app/recoil/atoms";
import { useRecoilState } from "recoil";

const Input = () => {
  const [inputSpotifyLink, setInputSpotifyLink] = useRecoilState(
    inputSpotifyLinkState
  );
  const [inputSpotifyId, setInputSpotifyId] =
    useRecoilState(inputSpotifyIdState);
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setInputSpotifyLink(link);

    const id = link.replace("https://open.spotify.com/playlist/", "");
    setInputSpotifyId(id);
  };

  const fetchPlaylist = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_SPOTIFY_API);
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${inputSpotifyId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_API}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error fetching playlist: ${response.status}`);
      }

      const data = await response.json();
      setPlaylistData(data);
      console.log("Playlist Data:", data);
    } catch (error) {
      console.error("Error fetching playlist");
    }
  };
  console.log(playlistData);

  return (
    <>
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
      </div>
      <div className="submit-button-section">
        <input
          className="submit-button"
          type="submit"
          value="GET THE PLAYLIST"
          onClick={fetchPlaylist}
        />
      </div>
    </>
  );
};

export default Input;
