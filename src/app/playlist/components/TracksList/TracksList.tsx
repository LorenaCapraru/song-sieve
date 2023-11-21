"use client";
import React, { useEffect, useState } from "react";
import "./TracksList.css";
import {
  playlistDataState,
  PlaylistData,
  filterOptionsState,
} from "@/app/recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import Track from "../Track/Track";
import { TrackObject } from "../Track/Track";

const TracksList: React.FC = () => {
  const [playlistData, setPlaylistData] = useRecoilState<
    PlaylistData | undefined
  >(playlistDataState);
  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionsState);
  const [tracksArr, setTracksArr] = useState<TrackObject[]>([]);
  const [explicit, setExplicit] = useState<boolean | null>(null);

  useEffect(() => {
    const updatedTracksArr =
      playlistData?.tracks?.items?.map((el) => el.track) || [];
    setTracksArr(updatedTracksArr);

    if (filterOptions.explicit && filterOptions.explicit === "Yes") {
      setTracksArr([...updatedTracksArr].filter((el) => el.explicit === true));
    
    } else if (filterOptions.explicit && filterOptions.explicit === "No")
      setTracksArr([...updatedTracksArr].filter((el) => el.explicit === false));
    else setTracksArr([...updatedTracksArr]);
  }, [playlistData, filterOptions, tracksArr]);

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
    <p>Sorry, there are no tracks found for this playlist.</p>
  );
};

export default TracksList;
