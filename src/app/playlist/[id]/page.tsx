"use client";
import Header from "@/app/components/Header/Header";
import "./page.css";
import SideBar from "@/app/components/SideBar/SideBar";
import MainPlaylist from "../components/MainPlaylist/MainPlaylist";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import { useEffect } from "react";

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  console.log("id", params.id);

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
    </div>
  );
};

export default PlaylistPage;
