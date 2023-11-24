"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./PlaylistHeader.css";
import {
  playlistDataState,
  PlaylistData,
  isUserLoggedInState,
  isPopupLoginOpenState,
  popupLoginTextState,
  isPopupConfirmOpenState,
  popupConfirmTextState,
  isMobileFilterOptionsOpenState,
  isFavouriteTracksPageState,
  tracksArrState,
  DBLibraryPlaylist,
  CurrentUser,
  currentUserState,
  isDBLibraryPlaylistChangedState,
} from "@/app/recoil/atoms";
import Image from "next/image";
import { TrackObject } from "../Track/Track";
import {
  extractSpotifyIds,
  generateCustomPlaylistID,
  getRandomNumber,
} from "@/utils/utils";
import { checkIfPlaylistNameExists, createPlaylist } from "@/utils/dbUtils";

const PlaylistHeader = () => {
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);
  const isFavouriteTracksPage = useRecoilValue(isFavouriteTracksPageState);
  const setIsPopupConfirmOpen = useSetRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const setPopupConfirmText = useSetRecoilState<string>(popupConfirmTextState);
  const tracksArr = useRecoilValue<TrackObject[] | undefined>(tracksArrState);
  const currentUser = useRecoilValue<CurrentUser | undefined>(currentUserState);
  const [isDBLibraryPlaylistChanged, setIsDBLibraryPlaylistChanged] =
    useRecoilState(isDBLibraryPlaylistChangedState);

  const handleCreatePlaylist = async (id: string, name: string) => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("add playlist to your library");
    } else {
      if (currentUser) {
        let playlistName: string = "";
        let tracksId: string[] = [];
        if (playlistData) {
          playlistName = playlistData.name;

          const isPlaylistNameExists = await checkIfPlaylistNameExists(
            currentUser.id,
            playlistName
          );

          playlistName = isPlaylistNameExists
            ? (playlistName = `${playlistName} ${getRandomNumber()}`)
            : playlistName;
        }

        if (tracksArr) {
          tracksId = extractSpotifyIds(tracksArr);
        }

        const libraryPlaylist: DBLibraryPlaylist = {
          name: playlistName,
          custom_id: generateCustomPlaylistID(),
          tracks: tracksId,
        };

        createPlaylist(currentUser.id, libraryPlaylist).then((status) => {
          setIsPopupConfirmOpen(true);
          if (status) {
            setIsDBLibraryPlaylistChanged(!isDBLibraryPlaylistChanged);
            setPopupConfirmText(
              `The playlist ${playlistName} was added to your library.`
            );
          } else {
            setPopupConfirmText(
              `There was a problem adding playlist ${name} to your library. Try again later.`
            );
          }
        });
      }
    }
  };

  const handlePlaySong = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("play music");
    } else {
      //play song
    }
  };

  const [isMobileFilterOptionsOpen, setIsMobileFilterOptionsOpen] =
    useRecoilState(isMobileFilterOptionsOpenState);

  const handleFilterButtonClick = () => {
    setIsMobileFilterOptionsOpen(!isMobileFilterOptionsOpen);
  };

  return (
    playlistData && (
      <div className="playlist-header-main">
        <div
          className="playlist-header-data"
          style={{
            backgroundImage: `radial-gradient(
            rgba(51, 51, 51, 0.5), 
            rgba(51, 51, 51, 0.5)), url(${
              isFavouriteTracksPage
                ? "/background_images/favourite_tracks.jpeg"
                : playlistData.images[0]?.url
                ? playlistData.images[0]?.url
                : "/background_images/logo_back_2.jpg"
            })`,
          }}
        >
          <p className="playlist-word">Playlist</p>
          <p className="playlist-header-name">
            {isFavouriteTracksPage ? "Favourite tracks" : playlistData?.name}
          </p>
          <p className="playlist-header-song-id">
            <span>{playlistData?.tracks.total} songs </span>
            {!isFavouriteTracksPage && `• ${playlistData?.id}`}
          </p>
        </div>
        <div className="header-filter-buttons">
          <div className="playlist-header-buttons">
            <div className="playlist-header-play-button-div">
              <Image
                src="/icons/play-icon.svg"
                alt="play icon used to play"
                width={22}
                height={22}
                className="playlist-header-play-icon"
                onClick={handlePlaySong}
              />
            </div>
            <button
              className="create-playlist-button"
              onClick={() =>
                handleCreatePlaylist(playlistData.id, playlistData.name)
              }
            >
              Create Playlist
            </button>
            {/* <Image
              src="/icons/heart-icon.svg"
              alt="heart icon used to save"
              width={22}
              height={22}
              className="playlist-header-heart-icon"
              onClick={() =>
                handleAddPlaylistToMyLibrary(playlistData.id, playlistData.name)
              }
            /> */}
            {/* <Image
              src="/icons/ellipsis-icon.svg"
              alt="ellipsis icon used for more options"
              width={22}
              height={22}
              className="playlist-header-ellipsis-icon"
            /> */}
          </div>

          <button className="filter-button" onClick={handleFilterButtonClick}>
            Filter
          </button>
        </div>
      </div>
    )
  );
};

export default PlaylistHeader;
