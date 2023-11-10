"use client";
import "./PopularPlaylist.css";
import PlaylistCover from "./components/PlaylistCover/PlaylistCover";


const PopularPlaylist = () => {
  return (
    <div className="popular-playlist-section">
      <h1 className="popular-playlist-header">Popular Playlists</h1>
      <PlaylistCover />
    </div>
  );
};

export default PopularPlaylist;
