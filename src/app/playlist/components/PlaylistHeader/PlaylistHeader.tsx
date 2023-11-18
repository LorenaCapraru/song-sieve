"use client";
import { useRecoilValue } from "recoil";
import "./PlaylistHeader.css";
import { playlistDataState, PlaylistData } from "@/app/recoil/atoms";
import Image from "next/image";
const PlaylistHeader = () => {
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );

  return (
    playlistData && (
      <div className="playlist-header-main">
        <div
          className="playlist-header-data"
          style={{
            backgroundImage: `radial-gradient(
            rgba(51, 51, 51, 0.5), 
            rgba(51, 51, 51, 0.5)), url(${playlistData.images[0]?.url})`,
          }}
        >
          <p className="playlist-word">Playlist</p>
          <p className="playlist-header-name">{playlistData?.name}</p>
          <p className="playlist-header-song-id">
            <span>{playlistData?.tracks.total} songs •</span> {playlistData?.id}
          </p>
        </div>
        <div className="playlist-header-buttons">
          <div className="playlist-header-play-button-div">
            <Image
              src="/icons/play-icon.svg"
              alt="play icon used to play"
              width={22}
              height={22}
              className="playlist-header-play-icon"
            />
          </div>
          <Image
            src="/icons/heart-icon.svg"
            alt="heart icon used to save"
            width={22}
            height={22}
            className="playlist-header-heart-icon"
          />
          <Image
            src="/icons/ellipsis-icon.svg"
            alt="ellipsis icon used for more options"
            width={22}
            height={22}
            className="playlist-header-ellipsis-icon"
          />
        </div>
      </div>
    )
  );
};

export default PlaylistHeader;
