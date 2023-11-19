import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import TracksList from "../TracksList/TracksList";
import "./MainPlaylist.css";

const MainPlaylist = () => {
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
