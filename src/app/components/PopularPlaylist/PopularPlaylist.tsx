"use client";
import "./PopularPlaylist.css";
import PlaylistCover from "./components/PlaylistCover/PlaylistCover";

const PopularPlaylist = () => {
  
  //replace this later with the actual popular playlists
  const playlistImages = [
    {
      image: "/playlist_images_temporary/album-cover-1.png",
    },
    {
      image: "/playlist_images_temporary/album-cover-2.png",
    },
    {
      image: "/playlist_images_temporary/album-cover-3.png",
    },
    {
      image: "/playlist_images_temporary/album-cover-4.png",
    },
    {
      image: "/playlist_images_temporary/album-cover-5.png",
    },
  ];

  return (
    <div className="popular-playlist-section">
      <h1 className="popular-playlist-header">Popular Playlists</h1>
      <div className="popular-playlist-row">
        {playlistImages.map((playlistImage) => (
          <PlaylistCover playlistImage={playlistImage.image} />
        ))}
      </div>
    </div>
  );
};

export default PopularPlaylist;
