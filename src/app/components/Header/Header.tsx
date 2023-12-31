/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  CurrentUser,
  currentUserState,
  isSideBarOpenState,
  isUserLoggedInState,
} from "@/app/recoil/atoms";
import "./Header.css";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { signOutUser } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] =
    useRecoilState<boolean>(isUserLoggedInState);
  const [currentUser, setCurrentUser] = useRecoilState<CurrentUser | undefined>(
    currentUserState
  );
  const isSideBarOpen = useRecoilValue(isSideBarOpenState);
  const router = useRouter();

  const handleLogOutOnClick = async () => {
    await signOutUser()
      .then((result) => {
        result ? router.push("/") : console.log("The logout was unsuccessful");
      })
      .catch((error) => {
        console.log("The logout was unsuccessful with error:", error);
      });
  };

  //check if user is logged in
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setIsUserLoggedIn(true);

        if (user && user.email) {
          let name = "";
          let surname = "";
          if (user.displayName !== null) {
            const nameParts = user.displayName.split(" ");
            name = nameParts[0];
            surname = nameParts[1];
          }

          const input: CurrentUser = {
            id: user.uid,
            image: "",
            name: name,
            surname: surname,
            email: user.email,
            type: "",
          };

          //TODO: to fetch user from db - to get image and type

          setCurrentUser(input);
        }
      } else {
        setIsUserLoggedIn(false);
        console.log("there is no user");
      }
    });
  }, []);

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
            {isUserLoggedIn ? (
              <>
                <p
                  className="header-logout-button"
                  onClick={handleLogOutOnClick}
                >
                  Log out
                </p>
                <Image
                  src="/icons/login-icon.svg"
                  alt="logo"
                  width={35}
                  height={35}
                />
              </>
            ) : (
              <>
                <p>Log in</p>
                <Image
                  src="/icons/login-icon.svg"
                  alt="logo"
                  width={35}
                  height={35}
                />
              </>
            )}
          </div>
        </Link>
      </div>

      <div className="desktop-header">
        <div className={`header-arrows ${isSideBarOpen ? "" : "margin-left"}`}>
          <div className="rotate-arrow" onClick={() => window.history.back()}>
            <Image
              src="/icons/arrow-icon.svg"
              alt="logo"
              width={15}
              height={15}
            />
          </div>

          <div onClick={() => window.history.forward()}>
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
            <Link href="/">
              <button onClick={handleLogOutOnClick}>Log out</button>
            </Link>
          ) : (
            <Link href="/signin">
              <button> Log in</button>
            </Link>
          )}

          {isUserLoggedIn && (
            <Link href="/">
              <div className="login-container">
                {currentUser && <p>{currentUser.name}</p>}
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
