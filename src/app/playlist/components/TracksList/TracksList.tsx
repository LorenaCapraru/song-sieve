"use client";
import React, { useEffect, useState } from "react";
import "./TracksList.css";
import {
  playlistDataState,
  PlaylistData,
  isFavouriteTracksPageState,
  currentUserState,
  CurrentUser,
  filterOptionsState,
  tracksArrState,
  isPopupConfirmOpenState,
} from "@/app/recoil/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Track, { TrackObject } from "../Track/Track";
import { Bars } from "react-loader-spinner";
import { getIdFromLibraryPlaylistUrl } from "@/utils/utils";
import { usePathname } from "next/navigation";

import PopupConfirm from "../Track/components/PopupConfirm/PopupConfirm";
import {
  getFavouriteTracksForUser,
  getOnePlaylistFromLibraryForUser,
} from "@/utils/dbUtils";

const TracksList: React.FC = () => {
  const [playlistData, setPlaylistData] = useRecoilState<
    PlaylistData | undefined
  >(playlistDataState);
  const isFavouriteTracksPage = useRecoilValue<boolean>(
    isFavouriteTracksPageState
  );
  const currentUser = useRecoilValue<CurrentUser | undefined>(currentUserState);
  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionsState);
  const [tracksArr, setTracksArr] = useRecoilState<TrackObject[] | undefined>(
    tracksArrState
  );
  const setIsPopupConfirmOpen = useSetRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const pathname = usePathname();

  // Fetches favourite tracks for a user
  useEffect(() => {
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
  }, [isFavouriteTracksPage, currentUser]);

  //check if the url includes "custom_playlists"
  useEffect(() => {
    console.log("pathname", pathname);
    if (pathname.includes("custom_playlist") && currentUser) {
      console.log("yes");
      const id = getIdFromLibraryPlaylistUrl(pathname);

      if (id !== null) {
        getOnePlaylistFromLibraryForUser(currentUser?.id, id)
          .then((playlist) => {
            console.log("playlist", playlist);
            setPlaylistData(playlist);
          })
          .catch((error) => {
            console.log(
              "There was a problem with fetchin a playlist from library, ",
              error
            );
          });
      }
    }
  }, [currentUser]);

  // Get tracks for all pages except Favourite_tracks
  useEffect(() => {
    if (!isFavouriteTracksPage) {
      const arr: TrackObject[] =
        playlistData?.tracks?.items?.map((el) => el.track) || [];
      setTracksArr(arr);
    }
  }, [playlistData]);

  //filter functionality
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

  //to clean the state when user leave the page
  useEffect(() => {
    setIsPopupConfirmOpen(false);
    setPlaylistData(undefined);
    setFilterOptions({ selectedDuration: null, explicit: null });
  }, [pathname]);

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
          {tracksArr && tracksArr.length > 0 ? (
            tracksArr.map((track, index) => (
              <Track key={index} track={track} rowNumber={index + 1} />
            ))
          ) : (
            <tr>
              <td></td>
              <td className="no-tracks-msg">There are no tracks.</td>
            </tr>
          )}
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
