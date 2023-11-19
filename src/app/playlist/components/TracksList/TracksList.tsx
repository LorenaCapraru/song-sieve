"use client";
import React from "react";
import "./TracksList.css";
import { playlistDataState, PlaylistData } from "@/app/recoil/atoms";
import { useRecoilValue } from "recoil";
import Track from "../Track/Track";
import { TrackObject } from "../Track/Track";
import { Bars } from "react-loader-spinner";

const TracksList: React.FC = () => {
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );

  const tracksArr: TrackObject[] =
    playlistData?.tracks?.items?.map((el) => el.track) || [];
  console.log(tracksArr);

  return playlistData ? (
    <div className="tracks-list-main">
      <table className="tracks-table">
        <thead className="tracks-table-header">
          <tr>
            <td className="col-hide-on-mobile">#</td>
            <td>Title</td>
            <td></td>
            <td className="col-hide-on-mobile">Album</td>
            <td className="col-hide-on-mobile">Date added</td>
            <td>Duration</td>
            <td></td>
            <td>Explicit</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {tracksArr &&
            tracksArr.length > 0 &&
            tracksArr.map((track, index) => (
              <Track key={index} track={track} rowNumber={index + 1} />
            ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="tracklist-loader">
      <Bars
        height="70"
        width="70"
        color="var(--trans-white)"
        ariaLabel="loading"
      />
    </div>
  );
};

export default TracksList;
