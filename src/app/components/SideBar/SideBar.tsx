"use client";
import {
  isFavouriteTracksPageState,
  isPopupLoginOpenState,
  isSideBarOpenState,
  isUserLoggedInState,
  popupLoginTextState,
} from "@/app/recoil/atoms";
import "./SideBar.css";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter, usePathname } from "next/navigation";
import FilterOptions from "./components/FilterOptions/FilterOptions";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(isSideBarOpenState);
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const [isPlaylistPage, setIsPlaylistPage] = useState<boolean>(false);
  const isFavouriteTracksPage = useRecoilValue<boolean>(
    isFavouriteTracksPageState
  );
  const pathname = usePathname();
  const router = useRouter();
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);

  const handleLinkToFavouriteTracks = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("open your favourite songs");
    } else {
      router.push("/favourite_tracks");
    }
  };

  const handleLinkToMyLibrary = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("open your library");
    } else {
      router.push("/my_library");
    }
  };

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  //Check which page is now - for displaying filter menu
  useEffect(() => {
    pathname.includes("playlist")
      ? setIsPlaylistPage(true)
      : setIsPlaylistPage(false);
  }, [pathname]);

  return (
    <div
      className={`
    sidebar-section ${isSideBarOpen ? "" : "sidebar-hidden"}`}
    >
      {!isSideBarOpen && (
        <div className="open-sidebar" onClick={toggleSidebar}>
          <Image
            src="/icons/close-sidebar-icon.svg"
            alt="close navbar"
            width={35}
            height={35}
          />
        </div>
      )}
      {isSideBarOpen && (
        <>
          <Link href="/">
            <div className="logo-container">
              <Image src="/icons/logo.png" alt="logo" width={60} height={60} />
              <p>Song Sieve</p>
            </div>
          </Link>
          <div className="close-sidebar" onClick={toggleSidebar}>
            <Image
              src="/icons/close-sidebar-icon.svg"
              alt="close navbar"
              width={35}
              height={35}
            />
          </div>
          <nav className="sidebar-menu">
            <ul>
              <li>
                <Link href="/">
                  <Image
                    src="/icons/home-icon.svg"
                    alt="Home"
                    width={25}
                    height={25}
                  />
                  <p>Home</p>
                </Link>
              </li>
              <li onClick={handleLinkToFavouriteTracks}>
                <Image
                  src="/icons/heart-icon.svg"
                  alt="Favourite tracks"
                  width={25}
                  height={25}
                />
                <p>Favourite tracks</p>
              </li>
              <li onClick={handleLinkToMyLibrary}>
                <Image
                  src="/icons/bookmark-icon.svg"
                  alt="My library"
                  width={25}
                  height={25}
                />
                <p>My library</p>
              </li>
            </ul>
          </nav>
          {isPlaylistPage && <FilterOptions />}
          {isFavouriteTracksPage && <FilterOptions />}
        </>
      )}
    </div>
  );
};

export default SideBar;
