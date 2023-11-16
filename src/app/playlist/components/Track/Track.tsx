import { FC } from "react";
import Image from "next/image";
import "./Track.css";
interface ExternalUrls {
  spotify: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
}

interface TrackProps {
  track: {
    album: Album;
    name: string;
    duration_ms: number;
    explicit: boolean;
    artists: Artist[];
    // Add other properties as needed
  };
}

const Track: FC<TrackProps> = ({ track }) => {
  function millisecondsToMinutes(milliseconds: number) {
    const minutes = milliseconds / (1000 * 60);
    return parseFloat(minutes.toFixed(2));
  }

  return (
    <>
      <tr className="track-row">
        <td className="track-image-artist-name">
          <Image
            src={track.album.images[0].url}
            alt="heart icon used to play"
            width={36}
            height={30}
            className="tracks-list-image"
          />
          <div className="track-artist-name">
            <span className="track-name">{track?.name}</span>
            <span className="artist-name">{track?.artists[0]?.name}</span>
          </div>
        </td>
        <td>{millisecondsToMinutes(track.duration_ms)}</td>
        <td>
          <Image
            src="/icons/heart-icon.svg"
            alt="heart icon used to play"
            width={13}
            height={14}
            className="playlist-header-heart-icon"
          />
        </td>
        <td>{track.explicit === true ? "Yes" : "No"}</td>
        <td>
          <Image
            src="/icons/ellipsis-icon.svg"
            alt="ellipsis icon used to play"
            width={13}
            height={14}
            className="playlist-header-ellipsis-icon"
          />
        </td>
      </tr>
    </>
  );
};

export default Track;
