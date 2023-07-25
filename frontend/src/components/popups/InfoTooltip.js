import React from "react";
import { usePopupClose } from "../../hooks/usePopupClose";
import { AppContext } from "../../contexts/AppContext";

export default function InfoTooltip(props) {
  const { name, isOpen, isError } = props;

  const { closeAllPopups } = React.useContext(AppContext);

  const styleName = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;

  usePopupClose(isOpen);

  return (
    <div className={styleName}>
      <div className="popup__container popup__container_place_tooltip">
        <div
          className={
            isError
              ? "popup__message-icon popup__message-icon_type_error"
              : "popup__message-icon popup__message-icon_type_success"
          }
        ></div>
        <p className="popup__message">
          {isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
        <button
          type="button"
          className="button popup__btn-close"
          aria-label="Закрыть"
          onClick={closeAllPopups}
        />
      </div>
    </div>
  );
}
