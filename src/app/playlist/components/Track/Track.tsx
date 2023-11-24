import { FC, createRef, useEffect, useState } from "react";
import Image from "next/image";
import "./Track.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  DBPlaylistData,
  currentUserState,
  isPopupConfirmOpenState,
  isPopupLoginOpenState,
  isUserLoggedInState,
  myLibraryPlaylistsState,
  popupConfirmTextState,
  popupLoginTextState,
} from "@/app/recoil/atoms";
import { millisecondsToMinutes } from "@/utils/utils";
import { createEmptyPlaylistWithName } from "@/utils/dbUtils";

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
    DBPlaylistData[] | undefined
  >(myLibraryPlaylistsState);
  const [arePlaylistOptionOpen, setArePlaylistOptionsOpen] =
    useState<boolean>(false);
  // const playlistOptionsRef = useRef<HTMLTableCellElement | undefined>(null);
  const playlistOptionsRef = createRef<HTMLTableCellElement>();
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState<boolean>(false);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [errMsg, setErrMSg] = useState<string>("");
  const setIsPopupConfirmOpen = useSetRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const setPopupConfirmText = useSetRecoilState<string>(popupConfirmTextState);
  const currentUser = useRecoilValue(currentUserState);

  const handleAddSongToFavouriteTracks = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("add song to favourite tracks");
    } else {
      //add playlist to library - make a request to db
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
      setErrMSg("Please provide a valid playlist name");
      return;
    }
    if (currentUser) {
      try {
        const status = await createEmptyPlaylistWithName(
          currentUser.id,
          newPlaylistName
        );
        if (status) {
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

  const handleMyLibraryPlaylistClick = (spotifyId: string, name: string) => {
    setIsPopupConfirmOpen(true);
    setPopupConfirmText(`The song was added to playlist ${name}.`);
    setArePlaylistOptionsOpen(false);
    //add this song to playlist - send request to db
  };

  const handleRemovePlaylistClick = (name: string) => {
    //check if user is logged in
    //then check if there is a playlist in current user's library
    //then remove the song
    //display a PopupConfirm component => displaying the info
  };

  useEffect(() => {
    //fetch all playlists from library of user

    // temporarily create an object
    const libraryPlaylists: DBPlaylistData[] = [
      {
        id: "db_id1",
        spotifyId: "37i9dQZF1E38So9B6KJSly",
        name: "Mix of the day 3",
      },
      {
        id: "db_id2",
        spotifyId: "0vvXsWCC9xrXsKd4FyS8kM",
        name: "Lofi girl - beats to relax/study to",
      },
      {
        id: "db_id3",
        spotifyId: "5aE6bhMLYXJWBvEIWm6ZaO",
        name: "Music for Stretching",
      },
    ];
    setMyLibraryPlaylists(libraryPlaylists);
  }, []);

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
            <span className="track-name">{track?.name}</span>
            <span className="artist-name">{track?.artists[0]?.name}</span>
          </div>
        </td>
        <td className="col-hide-on-mobile">{track.album.name}</td>

        <td>{millisecondsToMinutes(track.duration_ms)}</td>

        <td>
          <Image
            src="/icons/heart-icon.svg"
            alt="heart icon used to play"
            width={18}
            height={18}
            className="playlist-table-heart-icon"
            onClick={handleAddSongToFavouriteTracks}
          />
        </td>
        <td>{track.explicit === true ? "Yes" : "No"}</td>
        <td>
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
          <td ref={playlistOptionsRef} className="playlist-options">
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
              onClick={() => handleRemovePlaylistClick(track.name)}
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
                  key={playlist.id}
                  className="my-library-playlist-option"
                  onClick={() =>
                    handleMyLibraryPlaylistClick(
                      playlist.spotifyId,
                      playlist.name
                    )
                  }
                >
                  {playlist.name}
                </p>
              ))}
          </td>
        )}
      </tr>
    )
  );
};

export default Track;
