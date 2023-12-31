"use client";
import Input from "./components/Input/Input";
import Playlist from "./components/Playlist/Playlist";
import "./CheckPlaylist.css";

const CheckPlaylist = () => {
  return (
    <div className="check-playlist-section">
      <h1 className="check-playlist-header">
        Check the playlist from your friend
      </h1>
      <div className="id-provide-section">
        <p className="check-playlist-section-title">
          Provide link to Spotify playlist
        </p>
        <Input />
        <Playlist />
      </div>
    </div>
  );
};

export default CheckPlaylist;
