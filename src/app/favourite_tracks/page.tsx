"use client";
import { useRecoilValue } from "recoil";
import Header from "../components/Header/Header";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import PopupLogin from "../components/PopupLogIn/PopupLogin";
import SideBar from "../components/SideBar/SideBar";
import FilterOptions from "../components/SideBar/components/FilterOptions/FilterOptions";
import MainPlaylist from "../playlist/components/MainPlaylist/MainPlaylist";
import { isMobileFilterOptionsOpenState } from "../recoil/atoms";
import { useEffect } from "react";

const FavouriteTracksPage = () => {
  const isMobileFilterOptionsOpen = useRecoilValue(
    isMobileFilterOptionsOpenState
  );

  //update background image on first load
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_2.webp)";
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
