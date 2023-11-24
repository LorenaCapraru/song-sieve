"use client";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import SideBar from "./components/SideBar/SideBar";
import PopupLogin from "./components/PopupLogIn/PopupLogin";
import PopupConfirm from "./playlist/components/Track/components/PopupConfirm/PopupConfirm";
import { useSetRecoilState } from "recoil";
import { isFavouriteTracksPageState } from "./recoil/atoms";

export default function Home() {
  const setIsFavouriteTracksPage = useSetRecoilState<boolean>(
    isFavouriteTracksPageState
  );
  //update background image on first load
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_1.webp)";
    setIsFavouriteTracksPage(false);
  }, []);

  return (
    <div className="bg-template home-template">
      <Header />
      <SideBar />
      <Main />
      <MobileMenu />
      <PopupLogin />
      <PopupConfirm />
    </div>
  );
}
