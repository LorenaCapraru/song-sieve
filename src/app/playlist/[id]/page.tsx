"use client";
import Header from "@/app/components/Header/Header";
import "./page.css";
import SideBar from "@/app/components/SideBar/SideBar";
import MobileMenu from "@/app/components/MobileMenu/MobileMenu";
import MainPlaylist from "../components/MainPlaylist/MainPlaylist";
import { useEffect } from "react";
import { checkTokenTime } from "@/utils/utils";
import { useSetRecoilState } from "recoil";
import { playlistDataState } from "@/app/recoil/atoms";
import PopupLogin from "@/app/components/PopupLogIn/PopupLogin";
import { useRecoilValue } from "recoil";
import { isMobileFilterOptionsOpenState } from "@/app/recoil/atoms";
import FilterOptions from "@/app/components/SideBar/components/FilterOptions/FilterOptions";

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  console.log("id", params.id);
  const setPlaylistData = useSetRecoilState(playlistDataState);
  const isMobileFilterOptionsOpen = useRecoilValue(
    isMobileFilterOptionsOpenState
  );

  //update background image on first load and fetch the playlist data if it's needed
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_2.webp)";

    const fetchPlaylist = async () => {
      await checkTokenTime();
      const accessToken = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching playlist: ${response.status}`);
        }
        const data = await response.json();
        setPlaylistData(data);
        console.log("Playlist Data:", data);
      } catch (error) {
        console.error("Error fetching playlist" + error);
      }
    };

    fetchPlaylist();
  }, [params.id, setPlaylistData]);

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

export default PlaylistPage;
