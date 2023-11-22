"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import "./PopupLogin.css";
import { isPopupLoginOpenState, popupLoginTextState } from "@/app/recoil/atoms";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useRouter } from "next/navigation";

const PopupLogin = () => {
  const router = useRouter();
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useRecoilState(
    isPopupLoginOpenState
  );
  const popupLoginText = useRecoilValue(popupLoginTextState);

  const handleLoginClick = () => {
    setIsPopupLoginOpen(false);
    router.push("/signin");
  };

  return (
    <>
      {isPopupLoginOpen && (
        <div className="popup-login">
          <h4>{capitalizeFirstLetter(popupLoginText)}</h4>
          <p>Log in to {popupLoginText}.</p>
          <div className="popup-login-buttons">
            <button
              className="not-now-button"
              onClick={() => setIsPopupLoginOpen(false)}
            >
              Not now
            </button>
            <button className="login-button" onClick={handleLoginClick}>
              Log in
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupLogin;
