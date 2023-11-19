"use client";
import { useRecoilState } from "recoil";
import "./PopularPlaylist.css";
import PlaylistCover from "./components/PlaylistCover/PlaylistCover";
import { PlaylistData, popularPlaylistsState } from "@/app/recoil/atoms";
import { checkTokenTime } from "@/utils/utils";
import { useEffect } from "react";
import Link from "next/link";

const PopularPlaylist = () => {
  const [popularPlaylists, setPopularPlaylists] = useRecoilState<
    PlaylistData[] | undefined
  >(popularPlaylistsState);

  //fetch 5 popular playlists on first load
  useEffect(() => {
    const fetchPopularPlaylists = async () => {
      await checkTokenTime();
      const accessToken = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/browse/featured-playlists?limit=5`,
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

        const featuredPlaylists = data.playlists.items;
        console.log("featuredPlaylists", featuredPlaylists);
        setPopularPlaylists(featuredPlaylists);
      } catch (error) {
        console.error("Error fetching playlist" + error);
      }
    };

    fetchPopularPlaylists();
  }, []);

  return (
    <>
      {popularPlaylists ? (
        <div className="popular-playlist-section">
          <h1 className="popular-playlist-header">Popular Playlists</h1>
          <div className="popular-playlist-row">
            {popularPlaylists.map((popularPlaylist, index) => (
              <Link key={index} href={`/playlist/${popularPlaylist.id}`}>
                <PlaylistCover popularPlaylist={popularPlaylist} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p>Need to add here loader from another PR</p>
      )}
    </>
  );
};

export default PopularPlaylist;
