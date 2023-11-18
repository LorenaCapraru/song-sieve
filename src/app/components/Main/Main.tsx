import "./Main.css";
import CheckPlaylist from "../CheckPlaylist/CheckPlaylist";
import PopularPlaylist from "../PopularPlaylist/PopularPlaylist";

const Main = () => {
  return (
    <main className="main-section">
      <PopularPlaylist />
      <CheckPlaylist />
    </main>
  );
};

export default Main;
