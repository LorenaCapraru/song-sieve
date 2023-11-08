import Image from "next/image";
import { useState, ChangeEvent } from "react";
import "./Input.css";
import { inputSpotifyIdState } from "@/app/recoil/atoms";
import { useRecoilState } from "recoil";

const Input = () => {
  const [inputSpotifyId, setInputSpotifyId] =
    useRecoilState(inputSpotifyIdState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSpotifyId(e.target.value);
  };

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
          value={inputSpotifyId}
          onChange={handleChange}
          placeholder="Spotify playlist id"
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
