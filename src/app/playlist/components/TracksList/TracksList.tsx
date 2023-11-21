"use client";
import React from "react";
import "./TracksList.css";
import { playlistDataState, PlaylistData } from "@/app/recoil/atoms";
import { useRecoilValue } from "recoil";
import Track from "../Track/Track";
import { TrackObject } from "../Track/Track";

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
            <th className="col-hide-on-mobile">#</th>
            <th>Title</th>
            <th></th>
            <th className="col-hide-on-mobile">Album</th>
            <th className="col-hide-on-mobile">Date added</th>
            <th>Duration</th>
            <th></th>
            <th>Explicit</th>
            <th></th>
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
    <p>Sorry, there are no tracks found for this playlist.</p>
  );
};

export default TracksList;
