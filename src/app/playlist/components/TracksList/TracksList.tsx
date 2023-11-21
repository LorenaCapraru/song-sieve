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
} from "@/app/recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Track from "../Track/Track";
import { TrackObject } from "../Track/Track";
import { Bars } from "react-loader-spinner";
import { DBFavouriteTrack } from "@/app/recoil/atoms";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { checkTokenTime } from "@/utils/utils";

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

  useEffect(() => {
    const fetchTrack = async (id: string) => {
      await checkTokenTime();
      const accessToken = localStorage.getItem("access_token");
      let track: TrackObject | undefined = undefined;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching playlist: ${response.status}`);
        }
        const data = await response.json();
        track = data;
      } catch (error) {
        console.error("Error fetching track" + error);
      }

      return track;
    };

    if (isFavouriteTracksPage && currentUser) {
      const getFavoriteTracksForUser = async (userId: string) => {
        const favoriteTracksRef = collection(
          db,
          "users",
          userId,
          "favourite_tracks"
        );
        const querySnapshot = await getDocs(favoriteTracksRef);
        const arrayWithFavouriteTracks: DBFavouriteTrack[] = [];

        querySnapshot.forEach((doc) => {
          arrayWithFavouriteTracks.push(doc.data() as DBFavouriteTrack);
        });

        const tracksList: Array<{ track: TrackObject }> = [];
        if (arrayWithFavouriteTracks.length > 0) {
          for (const track of arrayWithFavouriteTracks) {
            const trackObject = await fetchTrack(track.spotify_id); // Await here
            if (trackObject) {
              tracksList.push({ track: trackObject });
            }
          }
        }

        return tracksList;
      };

      getFavoriteTracksForUser(currentUser.id)
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

  useEffect(() => {
    if (!isFavouriteTracksPage) {
      const arr: TrackObject[] =
        playlistData?.tracks?.items?.map((el) => el.track) || [];
      setTracksArr(arr);
    }
  }, [playlistData]);

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
