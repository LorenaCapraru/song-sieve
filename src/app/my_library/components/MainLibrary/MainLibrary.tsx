import { useEffect } from "react";
import "./MainLibrary.css";
import { getPlaylistsFromLibraryForUser } from "@/utils/utils";
import LibraryPlaylist from "../Playlist/LibraryPlaylist";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentUser,
  PlaylistData,
  currentUserState,
  libraryPlaylistsState,
} from "@/app/recoil/atoms";

const MainLibrary = () => {
  const currentUser = useRecoilValue<CurrentUser | undefined>(currentUserState);
  const [libraryPlaylists, setLibraryPlaylists] = useRecoilState<
    PlaylistData[] | undefined
  >(libraryPlaylistsState);
  //update background image on first load
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_2.webp)";
  }, []);

  // Fetches favourite tracks for a user
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
  }, []);

  return (
    <div className="main-section">
      <div className="library-container">
        <h2>My library</h2>
        <div className="library-playlists-container">
          {libraryPlaylists &&
            libraryPlaylists.map((playlist, index) => (
              <LibraryPlaylist key={index} playlist={playlist} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainLibrary;
