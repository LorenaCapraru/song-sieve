import { useEffect } from "react";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import TracksList from "../TracksList/TracksList";
import "./MainPlaylist.css";
import { useSetRecoilState } from "recoil";
import { isFavouriteTracksPageState } from "@/app/recoil/atoms";
import { usePathname } from "next/navigation";

const MainPlaylist = () => {
  const setIsFavouriteTracksPage = useSetRecoilState<boolean>(
    isFavouriteTracksPageState
  );
  const pathname = usePathname();

  //Check if the page is "favourite_tracks" for displaying favourite list of music
  useEffect(() => {
    document.body.style.backgroundImage = "url(/background_images/back_2.webp)";

    pathname.includes("favourite_tracks")
      ? setIsFavouriteTracksPage(true)
      : setIsFavouriteTracksPage(false);
  }, [pathname, setIsFavouriteTracksPage]);

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
