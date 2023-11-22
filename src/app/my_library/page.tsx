"use client";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import "./page.css";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import PopupLogin from "../components/PopupLogIn/PopupLogin";
import MainLibrary from "./components/MainLibrary/MainLibrary";

const MyLibraryPage = () => {
  return (
    <div className="bg-template home-template">
      <Header />
      <SideBar />
      <MainLibrary />
      <MobileMenu />
      <PopupLogin />
    </div>
  );
};

export default MyLibraryPage;
