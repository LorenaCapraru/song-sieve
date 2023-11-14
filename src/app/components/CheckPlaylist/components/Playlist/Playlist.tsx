import { playlistDataState } from "@/app/recoil/atoms";
import "./Playlist.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { PlaylistData } from "@/app/recoil/atoms";
import DOMPurify from "dompurify";

const Playlist = () => {
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );
  let sanitizedDescription: string = "";

  if (playlistData && playlistData.description) {
    sanitizedDescription = DOMPurify.sanitize(playlistData?.description);
  }

  return (
    playlistData && (
      <div className="playlist-section">
        <div className="playlist-song-and-description">
          <Image
            src={
              playlistData?.images[0]?.url
                ? playlistData.images[0].url
                : "/background_images/background_2.jpg"
            }
            alt="album cover"
            width={87}
            height={80}
            className="album-cover"
          />
          <div className="playlist-brief">
            <p className="playlist-name">{playlistData.name}</p>
            <p
              className="detail"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
            <p className="detail">id: {playlistData.id}</p>
            <p className="detail">tracks: {playlistData.tracks.total}</p>
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
    )
  );
};
export default Playlist;
