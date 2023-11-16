import { FC } from "react";
import Image from "next/image";
import "./Track.css";

interface Artist {
  name: string;
}

interface Album {
  release_date: string;
}

interface TrackProps {
  track: {
    album: Album;
    name: string;
    duration_ms: number;
    explicit: boolean;
    artists: Artist[];
  };
  rowNumber: number;
}

const Track: FC<TrackProps> = ({ track, rowNumber }) => {
  function millisecondsToMinutes(milliseconds: number) {
    const minutes = milliseconds / (1000 * 60);
    return parseFloat(minutes.toFixed(2));
  }

  const formattedDate = new Date(track?.album.release_date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    track && (
      <>
        <tr className="track-row">
          <td className="col-hide-on-mobile">{rowNumber}</td>

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
          <td className="col-hide-on-mobile">{track.album.name}</td>
          <td className="col-hide-on-mobile">{formattedDate}</td>

          <td>{millisecondsToMinutes(track.duration_ms)}</td>

          <td>
            <Image
              src="/icons/heart-icon.svg"
              alt="heart icon used to play"
              width={13}
              height={14}
              className="playlist-table-heart-icon"
            />
          </td>
          <td>{track.explicit === true ? "Yes" : "No"}</td>
          <td>
            <Image
              src="/icons/ellipsis-icon.svg"
              alt="ellipsis icon used to play"
              width={13}
              height={14}
              className="playlist-table-ellipsis-icon"
            />
          </td>
        </tr>
      </>
    )
  );
};

export default Track;
