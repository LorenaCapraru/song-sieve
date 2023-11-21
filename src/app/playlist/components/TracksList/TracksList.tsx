"use client";
import React, { useEffect, useState } from "react";
import "./TracksList.css";
import {
  playlistDataState,
  PlaylistData,
  filterOptionsState,
  tracksArrState,
} from "@/app/recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import Track from "../Track/Track";
import { TrackObject } from "../Track/Track";
import { Bars } from "react-loader-spinner";

const TracksList: React.FC = () => {
  const [playlistData, setPlaylistData] = useRecoilState<
    PlaylistData | undefined
  >(playlistDataState);
  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionsState);
  const [tracksArr, setTracksArr] = useRecoilState(tracksArrState);

  useEffect(() => {
    const updatedTracksArr =
      playlistData?.tracks?.items?.map((el) => el.track) || [];
    let filteredTracks = [...updatedTracksArr];

    if (filterOptions.explicit && filterOptions.explicit === "Yes") {
      filteredTracks = filteredTracks.filter((el) => el.explicit === true);
    } else if (filterOptions.explicit && filterOptions.explicit === "No") {
      filteredTracks = filteredTracks.filter((el) => el.explicit === false);
    }

    if (filterOptions.selectedDuration) {
      switch (filterOptions.selectedDuration) {
        case "less than 2 minutes":
          filteredTracks = filteredTracks.filter(
            (el) => el.duration_ms <= 120000
          );
          break;
        case "2-5 minutes":
          filteredTracks = filteredTracks.filter(
            (el) => el.duration_ms > 120000 && el.duration_ms <= 300000
          );
          break;
        case "5-10 minutes":
          filteredTracks = filteredTracks.filter(
            (el) => el.duration_ms > 300000 && el.duration_ms <= 600000
          );
          break;
        case "more than 10 minutes":
          filteredTracks = filteredTracks.filter(
            (el) => el.duration_ms > 600000
          );
          break;
        default:
          break;
      }
    }
    setTracksArr(filteredTracks);
  }, [playlistData, filterOptions.explicit, filterOptions.selectedDuration]);

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
