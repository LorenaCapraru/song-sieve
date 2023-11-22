"use client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../components/Header/Header";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import PopupLogin from "../components/PopupLogIn/PopupLogin";
import SideBar from "../components/SideBar/SideBar";
import FilterOptions from "../components/SideBar/components/FilterOptions/FilterOptions";
import MainPlaylist from "../playlist/components/MainPlaylist/MainPlaylist";
import "./page.css";
import {
  isFavouriteTracksPageState,
  isMobileFilterOptionsOpenState,
} from "../recoil/atoms";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const FavouriteTracksPage = () => {
  const isMobileFilterOptionsOpen = useRecoilValue(
    isMobileFilterOptionsOpenState
  );
  const setIsFavouriteTracksPage = useSetRecoilState<boolean>(
    isFavouriteTracksPageState
  );
  const pathname = usePathname();

  //update background image on first load
  //Check if the page is "favourite_tracks" for displaying favourite list of music
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_2.webp)";

    pathname.includes("favourite_tracks")
      ? setIsFavouriteTracksPage(true)
      : setIsFavouriteTracksPage(false);
  }, []);

  return (
    <div className="bg-template home-template">
      <Header />
      <SideBar />
      <MainPlaylist />
      <MobileMenu />
      <PopupLogin />
      {isMobileFilterOptionsOpen && <FilterOptions />}
    </div>
  );
};

export default FavouriteTracksPage;
