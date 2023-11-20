"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import "./PopupLogin.css";
import { isPopupLoginOpenState, popupLoginTextState } from "@/app/recoil/atoms";
import { capitalizeFirstLetter } from "@/utils/utils";
import Link from "next/link";

const PopupLogin = () => {
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useRecoilState(
    isPopupLoginOpenState
  );
  const popupLoginText = useRecoilValue(popupLoginTextState);

  return (
    <div className="popup-login">
      <h4>{capitalizeFirstLetter(popupLoginText)}</h4>
      <p>Log in to {popupLoginText}.</p>
      <div className="popup-login-buttons">
        <button className="not-now-button">Not now</button>
        <Link href="/singin">
          <button className="login-button">Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default PopupLogin;
