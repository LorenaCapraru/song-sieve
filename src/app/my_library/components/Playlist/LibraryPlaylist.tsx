import { currentUserState, isSideBarOpenState } from "@/app/recoil/atoms";
import "./LibraryPlaylist.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { PlaylistData } from "@/app/recoil/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removePlaylistFromLibrary } from "@/utils/utils";

interface LibraryPlaylistProps {
  playlist: PlaylistData;
  setIsPlaylistRemoved: React.Dispatch<React.SetStateAction<boolean>>;
}

const LibraryPlaylist: React.FC<LibraryPlaylistProps> = ({
  playlist,
  setIsPlaylistRemoved,
}) => {
  const [smallIdSection, setSmallIdSection] = useState(false);
  const isSideBarOpen = useRecoilValue(isSideBarOpenState);
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();

  const handleRemovePlaylistFromMyLibrary = () => {
    if (currentUser) {
      removePlaylistFromLibrary(currentUser?.id, playlist.id)
        .then((isPlaylistRemoved) => {
          setIsPlaylistRemoved(isPlaylistRemoved);
        })
        .catch((error) => {
          console.log("There was a problem with removing the playlist", error);
        });
    }
  };

  //handling resize of playlist-section
  const handleResize = () => {
    const idSectionContainer = document.querySelector(".id-provide-section");
    if (idSectionContainer) {
      const idSectionWidth = idSectionContainer?.clientWidth;
      idSectionWidth > 400 ? setSmallIdSection(false) : setSmallIdSection(true);
    }
  };

  const handlePlaylistClick = (id: string) => {
    router.push(`/playlist/${id}`);
  };

  //handling resize of playlist-section every time sidebar opens and closes
  useEffect(() => {
    setTimeout(handleResize, 200);
  }, [isSideBarOpen]);

  //handling resize of playlist-section every time the window resizes
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    playlist && (
      <div
        className={
          smallIdSection
            ? "playlist-small-section-wrapper"
            : "playlist-section-wrapper"
        }
      >
        <div className="trash-icon-container">
          <Image
            src="/icons/trash-icon.svg"
            alt="trash icon to remove playlist"
            width={25}
            height={25}
            className="trash-icon"
            onClick={handleRemovePlaylistFromMyLibrary}
          />
        </div>

        <div
          className={
            smallIdSection ? "playlist-small-section" : "playlist-section"
          }
          onClick={() => handlePlaylistClick(playlist.id)}
        >
          <Image
            src={
              playlist?.images[0]?.url
                ? playlist.images[0].url
                : "/background_images/logo_back.jpg"
            }
            alt="album cover"
            width={300}
            height={300}
            className="album-cover"
          />
          <div className="playlist-brief">
            <p className="playlist-name">{playlist.name}</p>
            <p className="detail">{playlist.description}</p>
            <p className="detail">tracks: {playlist.tracks.total}</p>
          </div>
        </div>
      </div>
    )
  );
};
export default LibraryPlaylist;
