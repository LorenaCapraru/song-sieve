import {
  coverImageState,
  descriptionState,
  playListNameState,
  playlistIdState,
  tracksState,
} from "@/app/recoil/atoms";
import "./Playlist.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";

const Playlist = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const tracks = useRecoilValue(tracksState);
  const description = useRecoilValue(descriptionState);
  const playListName = useRecoilValue(playListNameState);
  const coverImage = useRecoilValue(coverImageState);

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
          <p className="playlist-name">{playListName}</p>
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
