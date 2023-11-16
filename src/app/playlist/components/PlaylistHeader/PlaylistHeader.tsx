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
        <div
          className="playlist-header-data"
          style={{
            backgroundImage: `url(${playlistData.images[0]?.url})`,
          }}
        >
          <p className="playlist-word">Playlist</p>
          <p className="playlist-header-name">{playlistData?.name}</p>
          <p className="playlist-header-song-id">
            <span>{playlistData?.tracks.total} songs •</span> {playlistData?.id}
          </p>
        </div>
        <div className="playlist-header-buttons">button</div>
      </div>
    )
  );
};

export default PlaylistHeader;
