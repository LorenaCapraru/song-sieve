"use client";
import { isSideBarOpenState } from "@/app/recoil/atoms";
import "./SideBar.css";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import FilterOptions from "./components/FilterOptions/FilterOptions";

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(isSideBarOpenState);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div
      className={`
    sidebar-section ${isSideBarOpen ? "" : "sidebar-hidden"}`}
    >
      {!isSideBarOpen && (
        <div className="open-sidebar" onClick={toggleSidebar}>
          <Image
            src="/icons/close-sidebar-icon.svg"
            alt="close navbar"
            width={35}
            height={35}
          />
        </div>
      )}
      {isSideBarOpen && (
        <>
          <Link href="/">
            <div className="logo-container">
              <Image src="/icons/logo.png" alt="logo" width={60} height={60} />
              <p>Song Sieve</p>
            </div>
          </Link>
          <div className="close-sidebar" onClick={toggleSidebar}>
            <Image
              src="/icons/close-sidebar-icon.svg"
              alt="close navbar"
              width={35}
              height={35}
            />
          </div>
          <nav className="sidebar-menu">
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
              <li>
                <Link href="/favourite-tracks">
                  <Image
                    src="/icons/heart-icon.svg"
                    alt="Favourite tracks"
                    width={25}
                    height={25}
                  />
                  <p>Favourite tracks</p>
                </Link>
              </li>
              <li>
                <Link href="/my-library">
                  <Image
                    src="/icons/bookmark-icon.svg"
                    alt="My library"
                    width={25}
                    height={25}
                  />
                  <p>My library</p>
                </Link>
              </li>
            </ul>
          </nav>
          <FilterOptions />
        </>
      )}
    </div>
  );
};

export default SideBar;
