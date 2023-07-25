import React from "react";
import { usePopupClose } from "../../hooks/usePopupClose";
import { AppContext } from "../../contexts/AppContext";

function ImagePopup({ placeCard }) {
  console.log("ImagePopup");

  const { closeAllPopups } = React.useContext(AppContext);

  const popupStyle = placeCard.link
    ? "popup popup_place_image popup_opened"
    : "popup popup_place_image";

  usePopupClose(placeCard.link);

  return (
    <div id="popup-image" className={popupStyle}>
      <div className="popup__container popup__container_place_image">
        <figure className="popup__image-wrapper">
          <img
            className="popup__image"
            src={placeCard.link ? placeCard.link : "#"}
            alt={`Фото ${placeCard.name}`}
          />
          <figcaption className="popup__signature">{placeCard.name}</figcaption>
        </figure>
        <button
          type="button"
          className="button popup__btn-close"
          aria-label="Закрыть"
          onClick={closeAllPopups}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
