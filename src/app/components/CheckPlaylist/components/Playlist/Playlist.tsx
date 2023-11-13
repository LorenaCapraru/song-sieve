import { playlistDataState } from "@/app/recoil/atoms";
import "./Playlist.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { PlaylistData } from "@/app/recoil/atoms";

const Playlist = () => {
  const playlistData = useRecoilValue<PlaylistData>(playlistDataState);

  const isPlaylistDataNotEmpty = Object.keys(playlistData).length > 0;
  return (
    isPlaylistDataNotEmpty && (
      <div className="playlist-section">
        <div className="playlist-song-and-description">
          <Image
            src={playlistData.images[0].url}
            alt="album cover"
            width={87}
            height={80}
            className="album-cover"
          />
          <div className="playlist-brief">
            <p className="playlist-name">{playlistData.name}</p>
            <p className="detail">{playlistData.description}</p>
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
