import "./Playlist.css";
import Image from "next/image";

const Playlist = () => {
  return (
    <div className="playlist-section">
      <Image
        src="/background_images/background_2.jpg"
        alt="album cover"
        width={87}
        height={80}
        className="album-cover"
      />
      <div className="song-details">details</div>
      <Image
        src="/icons/heart-icon.svg"
        alt="heart icon to save"
        width={25}
        height={25}
        className="heart-save"
      />
    </div>
  );
};
export default Playlist;
