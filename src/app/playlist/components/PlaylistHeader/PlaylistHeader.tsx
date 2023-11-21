"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./PlaylistHeader.css";
import {
  playlistDataState,
  PlaylistData,
  isUserLoggedInState,
  isPopupLoginOpenState,
  popupLoginTextState,
  isMobileFilterOptionsOpenState,
  isFavouriteTracksPageState,
  favouriteTracksState,
} from "@/app/recoil/atoms";
import Image from "next/image";

const PlaylistHeader = () => {
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);
  const isFavouriteTracksPage = useRecoilValue(isFavouriteTracksPageState);
  const favouriteTracks = useRecoilValue(favouriteTracksState);

  const handleAddPlaylistToMyLibrary = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("add playlist to your library");
    } else {
      //add playlist to library - make a request to db
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
            <Image
              src="/icons/heart-icon.svg"
              alt="heart icon used to save"
              width={22}
              height={22}
              className="playlist-header-heart-icon"
              onClick={handleAddPlaylistToMyLibrary}
            />
            <Image
              src="/icons/ellipsis-icon.svg"
              alt="ellipsis icon used for more options"
              width={22}
              height={22}
              className="playlist-header-ellipsis-icon"
            />
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
