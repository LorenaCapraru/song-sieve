"use client";
import Header from "@/app/components/Header/Header";
import "./page.css";
import SideBar from "@/app/components/SideBar/SideBar";
import MainPlaylist from "../components/MainPlaylist/MainPlaylist";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import { useRecoilValue } from "recoil";
import { isMobileFilterOptionsOpenState } from "@/app/recoil/atoms";
import FilterOptions from "@/app/components/SideBar/components/FilterOptions/FilterOptions";

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  console.log("id", params.id);
  const isMobileFilterOptionsOpen = useRecoilValue(
    isMobileFilterOptionsOpenState
  );

  return (
    <div className="bg-template home-template">
      <Header />
      <SideBar />
      <MainPlaylist />
      <MobileMenu />
      {isMobileFilterOptionsOpen && <FilterOptions />}
    </div>
  );
};

export default PlaylistPage;
