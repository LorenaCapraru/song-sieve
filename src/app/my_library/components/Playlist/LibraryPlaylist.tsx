import {
  inputSpotifyLinkState,
  isGetPlaylistButtonClickedState,
  isPopupLoginOpenState,
  isSideBarOpenState,
  isUserLoggedInState,
  popupLoginTextState,
} from "@/app/recoil/atoms";
import "./LibraryPlaylist.css";
import Image from "next/image";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { PlaylistData } from "@/app/recoil/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LibraryPlaylistProps {
  playlist: PlaylistData;
}

const LibraryPlaylist: React.FC<LibraryPlaylistProps> = ({ playlist }) => {
  const [smallIdSection, setSmallIdSection] = useState(false);
  const isSideBarOpen = useRecoilValue(isSideBarOpenState);
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);
  const [isGetPlaylistButtonClicked, setIsGetPlaylistButtonClicked] =
    useRecoilState(isGetPlaylistButtonClickedState);
  const setInputSpotifyLink = useSetRecoilState(inputSpotifyLinkState);
  const router = useRouter();

  const handleAddPlaylistToMyLibrary = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("add playlist to your library");
    } else {
      //add playlist to library - make a request to db
    }
  };

  //handling resize of playlist-section
  const handleResize = () => {
    const idSectionContainer = document.querySelector(".id-provide-section");
    if (idSectionContainer) {
      const idSectionWidth = idSectionContainer?.clientWidth;
      idSectionWidth > 400 ? setSmallIdSection(false) : setSmallIdSection(true);
    }
  };

  //clear all values for input after clicking on playlist
  const handlePlaylistClick = (id: string) => {
    router.push(`/playlist/${id}`);
  };

  //handling resize of playlist-section every time sidebar opens and closes
  useEffect(() => {
    setTimeout(handleResize, 200);
  }, [isSideBarOpen]);

  //handling resize of playlist-section every time the window resizes
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    playlist && (
      <div
        className={
          smallIdSection
            ? "playlist-small-section-wrapper"
            : "playlist-section-wrapper"
        }
      >
        <div className="trash-icon-container">
          <Image
            src="/icons/trash-icon.svg"
            alt="trash icon to remove playlist"
            width={25}
            height={25}
            className="trash-icon"
            onClick={handleAddPlaylistToMyLibrary}
          />
        </div>

        <div
          className={
            smallIdSection ? "playlist-small-section" : "playlist-section"
          }
          onClick={() => handlePlaylistClick(playlist.id)}
        >
          <Image
            src={
              playlist?.images[0]?.url
                ? playlist.images[0].url
                : "/background_images/logo_back.jpg"
            }
            alt="album cover"
            width={300}
            height={300}
            className="album-cover"
          />
          <div className="playlist-brief">
            <p className="playlist-name">{playlist.name}</p>
            <p className="detail">{playlist.description}</p>
            <p className="detail">tracks: {playlist.tracks.total}</p>
          </div>
        </div>
      </div>
    )
  );
};
export default LibraryPlaylist;
