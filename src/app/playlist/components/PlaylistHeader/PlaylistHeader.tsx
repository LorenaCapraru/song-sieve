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
      <div className="playlist-header-main">
        <div className="playlist-header-data">
          <p className="playlist-word">Playlist</p>
          <p className="playlist-header-name">{playlistData?.name}</p>
          <p className="playlist-header-song-id">
            {playlistData?.tracks.total} songs
          </p>
          <p className="playlist-header-song-id">{playlistData?.id}</p>
        </div>
        <div className="playlist-header-buttons">button</div>
      </div>
    )
  );
};

export default PlaylistHeader;
