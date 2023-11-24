import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Track.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  DBLibraryPlaylistNameId,
  currentUserState,
  isDBLibraryPlaylistChangedState,
  isPopupConfirmOpenState,
  isPopupLoginOpenState,
  isUserLoggedInState,
  myLibraryPlaylistsState,
  popupConfirmTextState,
  popupLoginTextState,
} from "@/app/recoil/atoms";
import { millisecondsToMinutes, shortenString } from "@/utils/utils";
import {
  addFavouriteTrack,
  addSongToPlaylist,
  checkIfPlaylistNameExists,
  createEmptyPlaylistWithName,
  getPlaylistNamesIdsFromLibraryForUser,
} from "@/utils/dbUtils";

export interface TrackObject {
  id: string;
  album: Record<string, any>;
  name: string;
  duration_ms: number;
  explicit: boolean;
  artists: Record<string, any>;
}

interface TrackProps {
  track: TrackObject;
  rowNumber: number;
}

const Track: FC<TrackProps> = ({ track, rowNumber }) => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);
  const [myLibraryPlaylists, setMyLibraryPlaylists] = useRecoilState<
    DBLibraryPlaylistNameId[] | undefined
  >(myLibraryPlaylistsState);
  const [arePlaylistOptionOpen, setArePlaylistOptionsOpen] =
    useState<boolean>(false);
  // const playlistOptionsRef = createRef<HTMLDivElement>();
  const playlistOptionsRef = useRef<HTMLDivElement>(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState<boolean>(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [errMsg, setErrMSg] = useState<string>("");
  const setIsPopupConfirmOpen = useSetRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const setPopupConfirmText = useSetRecoilState<string>(popupConfirmTextState);
  const currentUser = useRecoilValue(currentUserState);
  const [isDBLibraryPlaylistChanged, setIsDBLibraryPlaylistChanged] =
    useRecoilState(isDBLibraryPlaylistChangedState);

  const handleAddSongToFavouriteTracks = async (
    trackId: string,
    trackName: string
  ) => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("add song to favourite tracks");
    } else {
      if (currentUser) {
        await addFavouriteTrack(currentUser.id, trackId).then((result) => {
          setIsPopupConfirmOpen(true);
          setArePlaylistOptionsOpen(false);
          if (result) {
            setPopupConfirmText(
              `The song ${trackName} was added to favourite tracks.`
            );
          } else {
            setPopupConfirmText(
              `Sorry it was a problem to add a song to favourite tracks. Try again later.`
            );
          }
        });
      }
    }
  };

  const handleCreatePlaylistClick = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("create a playlist");
    } else {
      setIsCreatingPlaylist(true);
    }
  };

  const handleCancelClick = () => {
    setIsCreatingPlaylist(false);
    setNewPlaylistName("");
  };

  const handleCreateClick = async () => {
    setErrMSg("");
    if (newPlaylistName.trim() === "") {
      setErrMSg("Please provide a valid playlist name.");
      return;
    }
    if (currentUser) {
      const isPlaylistNameExists = await checkIfPlaylistNameExists(
        currentUser.id,
        newPlaylistName
      );
      if (isPlaylistNameExists) {
        setErrMSg(
          "This name already exists. Please provide another playlist name."
        );
        return;
      }

      try {
        const status = await createEmptyPlaylistWithName(
          currentUser.id,
          newPlaylistName
        );
        if (status) {
          setIsDBLibraryPlaylistChanged(!isDBLibraryPlaylistChanged);
          setIsPopupConfirmOpen(true);
          setPopupConfirmText(
            `Playlist ${newPlaylistName} was created. Now you can add a song to the playlist.`
          );
          setArePlaylistOptionsOpen(false);
          setIsCreatingPlaylist(false);
          setNewPlaylistName("");
        } else {
          console.error("Failed to create playlist");
        }
      } catch (error) {
        console.error("Error creating playlist:", error);
      }
    }
  };

  const handleAddSongToPlaylist = async (
    playlistId: string,
    playlistName: string,
    trackId: string,
    songName: string
  ) => {
    if (currentUser) {
      await addSongToPlaylist(currentUser.id, playlistId, trackId).then(
        (result) => {
          setIsPopupConfirmOpen(true);
          setArePlaylistOptionsOpen(false);
          if (result) {
            setPopupConfirmText(
              `The song ${songName} was added to playlist ${playlistName}.`
            );
          } else {
            setPopupConfirmText(
              `Sorry it was a problem to add a song to playlist. Try again later.`
            );
          }
        }
      );
    }
  };

  const handleRemoveSongFromPLaylist = (name: string) => {
    //check if user is logged in
    //then check if there is a playlist in current user's library
    //then remove the song
    //display a PopupConfirm component => displaying the info
  };

  //fetch library playlist names
  useEffect(() => {
    const fetchLibraryPlaylists = async () => {
      if (currentUser) {
        const libraryPlaylists = await getPlaylistNamesIdsFromLibraryForUser(
          currentUser.id
        );
        setMyLibraryPlaylists(libraryPlaylists);
      }
    };

    fetchLibraryPlaylists();
  }, [currentUser, isDBLibraryPlaylistChanged]);

  //handle click outside of track's options
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playlistOptionsRef.current &&
        !playlistOptionsRef.current.contains(event.target as Node)
      ) {
        setArePlaylistOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    track && (
      <>
        <tr className="track-row">
          <td className="col-hide-on-mobile">{rowNumber}</td>
          <td className="track-list-image-container">
            <div>
              <Image
                src={track.album.images[0].url}
                alt="heart icon used to play"
                width={50}
                height={50}
                className="tracks-list-image"
              />
            </div>
          </td>
          <td>
            <div className="track-artist-name">
              <span className="track-name">
                {shortenString(track.name, 25)}
              </span>
              <span className="artist-name">{track.artists[0]?.name}</span>
            </div>
          </td>
          <td className="col-hide-on-mobile">
            {shortenString(track.album.name, 25)}
          </td>

          <td>{millisecondsToMinutes(track.duration_ms)}</td>

          <td>
            <Image
              src="/icons/heart-icon.svg"
              alt="heart icon used to play"
              width={18}
              height={18}
              className="playlist-table-heart-icon"
              onClick={() =>
                handleAddSongToFavouriteTracks(track.id, track.name)
              }
            />
          </td>
          <td>{track.explicit === true ? "Yes" : "No"}</td>
          <td className="td-last-child">
            <Image
              src="/icons/ellipsis-icon.svg"
              alt="ellipsis icon used to play"
              width={18}
              height={18}
              className="playlist-table-ellipsis-icon"
              onClick={() => setArePlaylistOptionsOpen(true)}
            />
          </td>
          {arePlaylistOptionOpen && (
            <div ref={playlistOptionsRef} className="playlist-options">
              <div>
                <p>Add song to the playlist</p>
                <Image
                  src="/icons/arrow-icon_2.svg"
                  alt="arrow"
                  width={18}
                  height={18}
                />
              </div>
              {/* to check if playlist is in user's library => then display */}
              {/* <div
              className="create-playlist-container"
              onClick={() => handleRemoveSongFromPLaylist(track.name)}
            >
              <p>Remove song from the playlist</p>
              <Image
                src="/icons/trash-icon.svg"
                alt="remove song"
                width={16}
                height={16}
              />
            </div> */}
              <div
                className="create-playlist-container"
                onClick={handleCreatePlaylistClick}
              >
                <p>Create a new playlist</p>
                <Image
                  src="/icons/plus_icon.svg"
                  alt="arrow"
                  width={18}
                  height={18}
                />
              </div>
              {isCreatingPlaylist && (
                <div className="create-playlist-input">
                  <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  {errMsg && <p className="err-msg">{errMsg}</p>}
                  <div className="create-playlist-input-buttons">
                    <button onClick={handleCancelClick}>Cancel</button>
                    <button onClick={handleCreateClick}>Create</button>
                  </div>
                </div>
              )}
              {isUserLoggedIn &&
                myLibraryPlaylists &&
                myLibraryPlaylists.map((playlist) => (
                  <p
                    key={playlist.custom_id}
                    className="my-library-playlist-option"
                    onClick={() =>
                      handleAddSongToPlaylist(
                        playlist.custom_id,
                        playlist.name,
                        track.id,
                        track.name
                      )
                    }
                  >
                    {playlist.name}
                  </p>
                ))}
            </div>
          )}
        </tr>
      </>
    )
  );
};

export default Track;
function MutableRefObject<T>() {
  throw new Error("Function not implemented.");
}
