import "./PlaylistCover.css";
import Image from "next/image";

interface PlaylistProps {
  playlistImage: string;
}

const PlaylistCover = ({ playlistImage }: PlaylistProps) => {
  return (
    <div className="popular-playlist-container">
      <div className="popular-playlist-image">
        <Image
          src={playlistImage}
          alt="Playlist Cover"
          width={300}
          height={300}
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
