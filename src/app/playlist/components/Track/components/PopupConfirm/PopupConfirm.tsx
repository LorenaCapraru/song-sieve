import {
  isPopupConfirmOpenState,
  popupConfirmTextState,
} from "@/app/recoil/atoms";
import "./PopupConfirm.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PopupConfirm = () => {
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useRecoilState<boolean>(
    isPopupConfirmOpenState
  );
  const popupConfirmText = useRecoilValue<string>(popupConfirmTextState);
  const [isPlaylistPage, setIsPlaylistPage] = useState<boolean>(false);

  const pathname = usePathname();

  //Check which page is now - for positioning popup window for playlist page in the bottom
  useEffect(() => {
    pathname.includes("playlist")
      ? setIsPlaylistPage(true)
      : setIsPlaylistPage(false);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupConfirmOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isPopupConfirmOpen]);

  return (
    <>
      {isPopupConfirmOpen && (
        <div
          className={
            isPlaylistPage
              ? "popup-confirm popup-confirm-bottom"
              : "popup-confirm"
          }
        >
          {popupConfirmText}
        </div>
      )}
    </>
  );
};

export default PopupConfirm;
