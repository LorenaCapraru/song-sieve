"use client";
import "./PopularPlaylist.css";
import PlaylistCover from "./components/PlaylistCover/PlaylistCover";

const PopularPlaylist = () => {
  //replace this later with the actual popular playlists
  const playlistImages = [
    {
      image: "/playlist_images_temporary/album-cover-1.webp",
    },
    {
      image: "/playlist_images_temporary/album-cover-2.webp",
    },
    {
      image: "/playlist_images_temporary/album-cover-3.webp",
    },
    {
      image: "/playlist_images_temporary/album-cover-4.webp",
    },
    {
      image: "/playlist_images_temporary/album-cover-5.webp",
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
