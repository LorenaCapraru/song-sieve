/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { isSideBarOpenState, isUserLoggedInState } from "@/app/recoil/atoms";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

const Header = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const isSideBarOpen = useRecoilValue(isSideBarOpenState);

  return (
    <header>
      <div className="mobile-header">
        <Link href="/">
          <div className="logo-container">
            <Image src="/icons/logo.png" alt="logo" width={60} height={60} />
            <p>Song Sieve</p>
          </div>
        </Link>

        <Link href="/signin">
          <div className="login-container">
            <p>Log in</p>
            <Image
              src="/icons/login-icon.svg"
              alt="logo"
              width={35}
              height={35}
            />
          </div>
        </Link>
      </div>

      <div className="desktop-header">
        <div className={`header-arrows ${isSideBarOpen ? "" : "margin-left"}`}>
          <div className="rotate-arrow">
            <Image
              src="/icons/arrow-icon.svg"
              alt="logo"
              width={15}
              height={15}
            />
          </div>

          <div>
            <Image
              src="/icons/arrow-icon.svg"
              alt="logo"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="login-account-container">
          {isUserLoggedIn ? (
            <button> Log out</button>
          ) : (
            <Link href="/signin">
              <button> Log in</button>
            </Link>
          )}

          {isUserLoggedIn && (
            <Link href="/dashboard">
              <div className="login-container">
                <p>Name</p>
                <Image
                  src="/icons/login-icon.svg"
                  alt="logo"
                  width={35}
                  height={35}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
