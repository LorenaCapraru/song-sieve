import "./PlaylistCover.css";
import Image from "next/image";

const PlaylistCover = () => {
  //change this later
  const playlistImage = require("../../../../../../public/playlist_images_temporary/album-cover-1.png");
  return (
    <div className="popular-playlist-container">
      <div className="popular-playlist-image">
        <Image
          src={playlistImage.default}
          alt="Playlist Cover"
          width={127}
          height={108}
          layout="fixed"
        />
      </div>
      <div className="popular-playlist-brief">
        <p className="popular-playlist-name">Today’s top hits</p>
        <p className="popular-playlist-description">
          Jung Kook is on top of the hottest
        </p>
      </div>
    </div>
  );
};
export default PlaylistCover;
