import Input from "../Input/Input";
import "./CheckPlaylist.css";

const CheckPlaylist = () => {
  return (
    <div className="check-playlist-section">
      <h1 className="check-playlist-header">
        {" "}
        Check the playlist from your friend
      </h1>
      <div className="id-provide-section">
        <p>Provide id of Spotify playlist</p>
        <Input />
      </div>
    </div>
  );
};

export default CheckPlaylist;
