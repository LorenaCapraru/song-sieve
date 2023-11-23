"use client";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import SideBar from "./components/SideBar/SideBar";
import PopupLogin from "./components/PopupLogIn/PopupLogin";
import PopupConfirm from "./playlist/components/Track/components/PopupConfirm/PopupConfirm";

export default function Home() {
  //update background image on first load
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_1.webp)";
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
