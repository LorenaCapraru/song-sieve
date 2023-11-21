import { PlaylistData } from "@/app/recoil/atoms";
import "./PlaylistCover.css";
import Image from "next/image";
import { shortenString } from "@/utils/utils";

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
        <p className="popular-playlist-name">{shortenString(name, 12)}</p>
        <p className="popular-playlist-description">
          {shortenString(description, 27)}
        </p>
      </div>
    </div>
  );
};
export default PlaylistCover;
