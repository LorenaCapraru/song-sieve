import {
  isPopupLoginOpenState,
  isUserLoggedInState,
  popupLoginTextState,
} from "@/app/recoil/atoms";
import "./MobileMenu.css";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

const MobileMenu = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const router = useRouter();
  const setIsPopupLoginOpen = useSetRecoilState(isPopupLoginOpenState);
  const setPopupLoginText = useSetRecoilState(popupLoginTextState);

  const handleLinkToFavouriteTracks = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("open your favourite songs");
    } else {
      router.push("/favourite_tracks");
    }
  };

  const handleLinkToMyLibrary = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("open your library");
    } else {
      router.push("/my_library");
    }
  };

  return (
    <nav className="mobile-menu">
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/icons/home-icon.svg"
              alt="Home"
              width={25}
              height={25}
            />
            <p>Home</p>
          </Link>
        </li>
        <li onClick={handleLinkToFavouriteTracks}>
          <Image
            src="/icons/heart-icon.svg"
            alt="Favourite tracks"
            width={25}
            height={25}
          />
          <p>
            Favourite <br />
            tracks
          </p>
        </li>
        <li onClick={handleLinkToMyLibrary}>
          <Image
            src="/icons/bookmark-icon.svg"
            alt="My library"
            width={25}
            height={25}
          />
          <p>My library</p>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
