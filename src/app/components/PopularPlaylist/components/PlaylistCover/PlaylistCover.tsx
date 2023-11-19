import { PlaylistData } from "@/app/recoil/atoms";
import "./PlaylistCover.css";
import Image from "next/image";

interface PlaylistProps {
  popularPlaylist: PlaylistData;
}

const PlaylistCover = ({ popularPlaylist }: PlaylistProps) => {
  const { name, description, images } = popularPlaylist;

  return (
    <div className="popular-playlist-container">
      <div className="popular-playlist-image">
        <Image
          src={images[0].url}
          alt="Playlist Cover"
          width={300}
          height={300}
        />
      </div>
      <div className="popular-playlist-brief">
        <p className="popular-playlist-name">{name}</p>
        <p className="popular-playlist-description">{description}</p>
      </div>
    </div>
  );
};
export default PlaylistCover;
