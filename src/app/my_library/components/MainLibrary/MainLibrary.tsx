import { useEffect, useState } from "react";
import "./MainLibrary.css";
import { getPlaylistsFromLibraryForUser } from "@/utils/utils";
import LibraryPlaylist from "../Playlist/LibraryPlaylist";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CurrentUser,
  PlaylistData,
  currentUserState,
  isFavouriteTracksPageState,
  libraryPlaylistsState,
} from "@/app/recoil/atoms";
import { Bars } from "react-loader-spinner";
import { usePathname } from "next/navigation";

const MainLibrary = () => {
  const currentUser = useRecoilValue<CurrentUser | undefined>(currentUserState);
  const [libraryPlaylists, setLibraryPlaylists] = useRecoilState<
    PlaylistData[] | undefined
  >(libraryPlaylistsState);
  //update background image on first load
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_2.webp)";
  }, []);
  const [isPlaylistRemoved, setIsPlaylistRemoved] = useState<boolean>(false);
  const setIsFavouriteTracksPage = useSetRecoilState<boolean>(
    isFavouriteTracksPageState
  );
  const pathname = usePathname();

  // Fetches library playlists for a user
  useEffect(() => {
    if (currentUser) {
      getPlaylistsFromLibraryForUser(currentUser.id)
        .then((playlistItems) => {
          setLibraryPlaylists(playlistItems);
        })
        .catch((error) => {
          console.error("Error fetching playlists from library: ", error);
        });
    }

    pathname.includes("favourite_tracks")
      ? setIsFavouriteTracksPage(true)
      : setIsFavouriteTracksPage(false);
  }, [currentUser]);

  //fetch library playlists when user is removed
  useEffect(() => {
    console.log("isplaylist removes", isPlaylistRemoved);
    if (currentUser) {
      setIsPlaylistRemoved(false);
      getPlaylistsFromLibraryForUser(currentUser.id)
        .then((playlistItems) => {
          setLibraryPlaylists(playlistItems);
        })
        .catch((error) => {
          console.error("Error fetching playlists from library: ", error);
        });
    }
  }, [isPlaylistRemoved]);

  return (
    <div className="main-section">
      <div className="library-container">
        <h2>My library</h2>
        <div className="library-playlists-container">
          {libraryPlaylists ? (
            libraryPlaylists.map((playlist, index) => (
              <LibraryPlaylist
                key={index}
                playlist={playlist}
                setIsPlaylistRemoved={setIsPlaylistRemoved}
              />
            ))
          ) : (
            <div className="library-loader">
              <Bars
                height="70"
                width="70"
                color="var(--trans-white)"
                ariaLabel="loading"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLibrary;
