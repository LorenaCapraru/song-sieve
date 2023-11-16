"use client";
import React from "react";
import "./TracksList.css";
import Image from "next/image";
import { playlistDataState, PlaylistData } from "@/app/recoil/atoms";
import { useRecoilValue } from "recoil";
import Track from "../Track/Track";

const TracksList: React.FC = () => {
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );

  const tracksArr: any[] =
    playlistData?.tracks?.items?.map((el) => el.track) || [];

  return (
    playlistData && (
      <div className="tracks-list-main">
        <table className="tracks-table">
          <thead className="tracks-table-header">
            <tr>
              <td>Title</td>
              <td>Duration</td>
              <td></td>
              <td>Explicit</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {tracksArr.map((track, index) => (
              <Track key={index} track={track} />
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default TracksList;
