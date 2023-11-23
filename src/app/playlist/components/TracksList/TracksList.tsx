"use client";
import React, { use, useEffect, useState } from "react";
import "./TracksList.css";
import {
  playlistDataState,
  PlaylistData,
  favouriteTracksState,
  isFavouriteTracksPageState,
  currentUserState,
  CurrentUser,
  filterOptionsState,
  tracksArrState,
} from "@/app/recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Track from "../Track/Track";
import { Bars } from "react-loader-spinner";
import { DBFavouriteTrack } from "@/app/recoil/atoms";
import { getFavouriteTracksForUser } from "@/utils/utils";
import PopupConfirm from "../Track/components/PopupConfirm/PopupConfirm";

const TracksList: React.FC = () => {
  const [playlistData, setPlaylistData] = useRecoilState<
    PlaylistData | undefined
  >(playlistDataState);
  const [favouriteTracks, setFavouriteTracks] = useRecoilState<
    DBFavouriteTrack[] | undefined
  >(favouriteTracksState);
  const isFavouriteTracksPage = useRecoilValue<boolean>(
    isFavouriteTracksPageState
  );
  const currentUser = useRecoilValue<CurrentUser | undefined>(currentUserState);
  const [tracksArr, setTracksArr] = useState<TrackObject[] | undefined>(
    undefined
  );
  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionsState);
  const [tracksArr, setTracksArr] = useRecoilState(tracksArrState);

  // Fetches favourite tracks for a user
  useEffect(() => {
    console.log("isFavouriteTracksPage", isFavouriteTracksPage);
    if (isFavouriteTracksPage && currentUser) {
      getFavouriteTracksForUser(currentUser.id)
        .then((tracksList) => {
          const favouritePlaylistData: PlaylistData = {
            name: "Favourite tracks",
            description: "Favourite tracks",
            id: "Favourite tracks",
            images: [],
            tracks: {
              total: tracksList.length,
              items: tracksList,
            },
          };
          setPlaylistData(favouritePlaylistData);
          const arr: TrackObject[] =
            favouritePlaylistData?.tracks?.items?.map((el) => el.track) || [];
          setTracksArr(arr);
        })
        .catch((error) => {
          console.error("Error fetching favorite tracks: ", error);
        });
    }
  }, [isFavouriteTracksPage]);

  // Get tracks for all pages except Favourite_tracks
  useEffect(() => {
    if (!isFavouriteTracksPage) {
      const arr: TrackObject[] =
        playlistData?.tracks?.items?.map((el) => el.track) || [];
      setTracksArr(arr);
    }
  }, [playlistData]);
 

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
      <PopupConfirm />
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
