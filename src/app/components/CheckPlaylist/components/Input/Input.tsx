import Image from "next/image";
import { ChangeEvent } from "react";
import "./Input.css";
import {
  inputSpotifyIdState,
  inputSpotifyLinkState,
  playlistDataState,
} from "@/app/recoil/atoms";
import { useRecoilState } from "recoil";
import { PlaylistData } from "@/app/recoil/atoms";
import { checkTokenTime } from "@/utils/utils";

const Input = () => {
  const [inputSpotifyLink, setInputSpotifyLink] = useRecoilState(
    inputSpotifyLinkState
  );
  const [inputSpotifyId, setInputSpotifyId] =
    useRecoilState(inputSpotifyIdState);
  const [playlistData, setPlaylistData] = useRecoilState<
    PlaylistData | undefined
  >(playlistDataState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setInputSpotifyLink(link);

    const id = link.replace("https://open.spotify.com/playlist/", "");
    setInputSpotifyId(id);
  };

  const fetchPlaylist = async () => {
    await checkTokenTime();
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${inputSpotifyId}`,
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

  return (
    <>
      <div className="input-section">
        <Image
          src="/icons/spotify-icon.svg"
          alt="spotify brand"
          width={16}
          height={16}
          className="icon"
        />
        <input
          type="text"
          value={inputSpotifyLink}
          onChange={handleChange}
          placeholder="Spotify playlist link"
          className="input-field"
        />
      </div>
      <div className="submit-button-section">
        <input
          className="submit-button"
          type="submit"
          value="GET THE PLAYLIST"
          onClick={fetchPlaylist}
        />
      </div>
    </>
  );
};

export default Input;
