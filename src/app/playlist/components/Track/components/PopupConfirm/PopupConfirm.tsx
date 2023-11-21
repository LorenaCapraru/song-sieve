import {
  isPopupConfirmOpenState,
  popupConfirmTextState,
} from "@/app/recoil/atoms";
import "./PopupConfirm.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

const PopupConfirm = () => {
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const popupConfirmText = useRecoilValue<string>(popupConfirmTextState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupConfirmOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isPopupConfirmOpen]);

  return (
    <>
      {isPopupConfirmOpen && (
        <div className="popup-confirm">{popupConfirmText}</div>
      )}
    </>
  );
};

export default PopupConfirm;
