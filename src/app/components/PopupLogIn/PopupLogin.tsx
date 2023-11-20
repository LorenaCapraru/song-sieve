"use client";
import { useRecoilState } from "recoil";
import "./PopupLogin.css";
import { isPopupLoginOpenState } from "@/app/recoil/atoms";

interface PopupLoginProps {
  text: string;
}

const PopupLogin: React.FC<PopupLoginProps> = ({ text }) => {
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useRecoilState(
    isPopupLoginOpenState
  );

  return (
    <div className="popup-login">
      <h2>{text}</h2>
      <p>Log in {text}.</p>
      <div className="popup-login-buttons">
        <button>Not now</button>
        <button>Log in</button>
      </div>
    </div>
  );
};

export default PopupLogin;
