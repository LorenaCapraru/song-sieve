import {
  isPopupLoginOpenState,
  isSideBarOpenState,
  isUserLoggedInState,
  playlistDataState,
  popupLoginTextState,
} from "@/app/recoil/atoms";
import "./Playlist.css";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PlaylistData } from "@/app/recoil/atoms";
import { useEffect, useState } from "react";
import Link from "next/link";

const Playlist = () => {
  const playlistData = useRecoilValue<PlaylistData | undefined>(
    playlistDataState
  );
  const [smallIdSection, setSmallIdSection] = useState(false);
  const isSideBarOpen = useRecoilValue(isSideBarOpenState);
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);

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
    playlistData && (
      <div className="playlist-section-wrapper">
        <div className="heart-icon-container">
          <Image
            src="/icons/heart-icon.svg"
            alt="heart icon to save"
            width={25}
            height={25}
            className="heart-save"
            onClick={handleAddPlaylistToMyLibrary}
          />
        </div>

        <Link href={`/playlist/${playlistData.id}`}>
          <div
            className={
              smallIdSection ? "playlist-small-section" : "playlist-section"
            }
          >
            <Image
              src={
                playlistData?.images[0]?.url
                  ? playlistData.images[0].url
                  : "/background_images/background_2.jpg"
              }
              alt="album cover"
              width={300}
              height={300}
              className="album-cover"
            />
            <div className="playlist-brief">
              <p className="playlist-name">{playlistData.name}</p>
              <p className="detail">{playlistData.description}</p>
              <p className="detail">id: {playlistData.id}</p>
              <p className="detail">tracks: {playlistData.tracks.total}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  );
};
export default Playlist;
