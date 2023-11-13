import Image from "next/image";
import { useState, ChangeEvent } from "react";
import "./Input.css";
import { inputSpotifyIdState, inputSpotifyLinkState } from "@/app/recoil/atoms";
import { useRecoilState } from "recoil";

const Input = () => {
  const [inputSpotifyLink, setInputSpotifyLink] = useRecoilState(
    inputSpotifyLinkState
  );

  const [inputSpotifyId, setInputSpotifyId] =
    useRecoilState(inputSpotifyIdState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setInputSpotifyLink(link);

    const id = link.replace("https://open.spotify.com/playlist/", "");
    setInputSpotifyId(id);
  };
  console.log("input id", inputSpotifyId);

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
        />
      </div>
    </>
  );
};

export default Input;
