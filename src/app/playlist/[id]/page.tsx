"use client";
import Header from "@/app/components/Header/Header";
import "./page.css";
import SideBar from "@/app/components/SideBar/SideBar";
import MainPlaylist from "../components/MainPlaylist/MainPlaylist";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import { useEffect } from "react";
import { checkTokenTime } from "@/utils/utils";
import { useSetRecoilState } from "recoil";
import { playlistDataState } from "@/app/recoil/atoms";
import PopupLogin from "@/app/components/PopupLogIn/PopupLogin";

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  console.log("id", params.id);
  const setPlaylistData = useSetRecoilState(playlistDataState);

  //update background image on first load and fetch the playlist data if it's needed
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_2.webp)";

    const fetchPlaylist = async () => {
      console.log("getch data");
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
  }, []);

  return (
    <div className="bg-template home-template">
      <Header />
      <SideBar />
      <MainPlaylist />
      <MobileMenu />
      <PopupLogin />
    </div>
  );
};

export default PlaylistPage;
