import Header from "@/app/components/Header/Header";
import "./page.css";
import SideBar from "@/app/components/SideBar/SideBar";
import MainPlaylist from "../components/MainPlaylist/MainPlaylist";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  console.log("id", params.id);

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
