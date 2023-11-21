import { useEffect } from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import TracksList from "../TracksList/TracksList";
import "./MainPlaylist.css";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { isFavouriteTracksPageState } from "@/app/recoil/atoms";

const MainPlaylist = () => {
  const setIsFavouriteTracksPage = useSetRecoilState<boolean>(
    isFavouriteTracksPageState
  );
  const pathname = usePathname();

  //Check if the page is "favourite_tracks" for displaying list of music
  useEffect(() => {
    pathname.includes("favourite_tracks")
      ? setIsFavouriteTracksPage(true)
      : setIsFavouriteTracksPage(false);
  }, [pathname]);

  return (
    <div className="main-section">
      <div className="main-playlist-container">
        <PlaylistHeader />
        <TracksList />
      </div>
    </div>
  );
};

export default MainPlaylist;
