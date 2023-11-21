import { FC } from "react";
import Image from "next/image";
import "./Track.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isPopupLoginOpenState,
  isUserLoggedInState,
  popupLoginTextState,
} from "@/app/recoil/atoms";

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

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  images: Image[];
  name: string;
  release_date: string;
}

export interface TrackObject {
  album: Album;
  name: string;
  duration_ms: number;
  explicit: boolean;
  artists: Artist[];
}

interface TrackProps {
  track: TrackObject;
  rowNumber: number;
}

const Track: FC<TrackProps> = ({ track, rowNumber }) => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);

  const handleAddSongToFavouriteTracks = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("add song to favourite tracks");
    } else {
      //add playlist to library - make a request to db
    }
  };

  const millisecondsToMinutes = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  const formattedDate =
    track?.album.release_date &&
    new Date(track.album.release_date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    track && (
      <tr className="track-row">
        <td className="col-hide-on-mobile">{rowNumber}</td>
        <td className="track-list-image-container">
          <div>
            <Image
              src={track.album.images[0].url}
              alt="heart icon used to play"
              width={50}
              height={50}
              className="tracks-list-image"
            />
          </div>
        </td>
        <td>
          <div className="track-artist-name">
            <span className="track-name">{track?.name}</span>
            <span className="artist-name">{track?.artists[0]?.name}</span>
          </div>
        </td>
        <td className="col-hide-on-mobile">{track.album.name}</td>
        <td className="col-hide-on-mobile tracks-date">{formattedDate}</td>

        <td>{millisecondsToMinutes(track.duration_ms)}</td>

        <td>
          <Image
            src="/icons/heart-icon.svg"
            alt="heart icon used to play"
            width={18}
            height={18}
            className="playlist-table-heart-icon"
            onClick={handleAddSongToFavouriteTracks}
          />
        </td>
        <td>{track.explicit === true ? "Yes" : "No"}</td>
        <td>
          <Image
            src="/icons/ellipsis-icon.svg"
            alt="ellipsis icon used to play"
            width={18}
            height={18}
            className="playlist-table-ellipsis-icon"
          />
        </td>
      </tr>
    )
  );
};

export default Track;
