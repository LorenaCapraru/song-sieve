"use client";
import { useRecoilValue } from "recoil";
import "./PlaylistHeader.css";
import { playlistDataState, PlaylistData } from "@/app/recoil/atoms";

const PlaylistHeader = () => {
  // console.log()
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );
  console.log(playlistData);
  return (
    playlistData && (
      <div>
        <div className="playlist-header-data">
          <p>Playlist</p>
          <p>{playlistData?.name}</p>
          <p>{playlistData?.tracks.total} songs</p>
          <p>{playlistData?.id}</p>
        </div>
        <div className="playlist-header-buttons">button</div>
      </div>
    )
  );
};

export default PlaylistHeader;
