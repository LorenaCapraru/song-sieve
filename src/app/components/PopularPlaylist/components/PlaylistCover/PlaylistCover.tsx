"use client";
import { PlaylistData } from "@/app/recoil/atoms";
import "./PlaylistCover.css";
import Image from "next/image";
import { shortenString } from "@/utils/utils";
import Link from "next/link";

interface PlaylistProps {
  popularPlaylist: PlaylistData;
}

const PlaylistCover = ({ popularPlaylist }: PlaylistProps) => {
  const { id, name, description, images } = popularPlaylist;

  return (
    <Link
      href={`/playlist/${popularPlaylist.id}`}
      className="popular-playlist-container"
    >
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
    </Link>
  );
};
export default PlaylistCover;
