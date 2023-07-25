import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

export function usePopupClose(isOpen) {
  const { closeAllPopups } = useContext(AppContext);
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);
    console.log("EventListener - установлены");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
      console.log("EventListener - удалены");
    };
  }, [isOpen, closeAllPopups]);
}
