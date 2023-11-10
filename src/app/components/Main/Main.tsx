import "./Main.css";
import CheckPlaylist from "../CheckPlaylist/CheckPlaylist";
import PopularPlaylist from "../PopularPlaylist/PopularPlaylist";

const Main = () => {
  return (
    <div className="main-home-page">
      <PopularPlaylist />
      <CheckPlaylist />
    </div>
  );
};

export default Main;
