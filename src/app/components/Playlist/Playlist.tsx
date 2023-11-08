import "./Playlist.css";
import Image from "next/image";
import { useState } from "react";

const Playlist = () => {
  const [playlistId, setPlayListId] = useState<string>("hfjdkvfhfolskdjfhf");
  const [tracks, setTracks] = useState<number>(25);
  const [description, setDescription] = useState<string>(
    "Kick back to the best new and recent chill hits"
  );
  const [playListName, setPlayListName] = useState<string>("Chill hits");
  const [coverImage, setCoverImage] = useState<string>(
    "/background_images/background_2.jpg"
  );

  return (
    <div className="playlist-section">
      <div className="playlist-song-and-description">
        <Image
          src={coverImage}
          alt="album cover"
          width={87}
          height={80}
          className="album-cover"
        />
        <div className="playlist-brief">
          <p className="playlist-name">Chill hits</p>
          <p className="detail">{description} </p>
          <p className="detail">id: {playlistId}</p>
          <p className="detail">tracks:{tracks}</p>
        </div>
      </div>
      <Image
        src="/icons/heart-icon.svg"
        alt="heart icon to save"
        width={15}
        height={15}
        className="heart-save"
      />
    </div>
  );
};
export default Playlist;
