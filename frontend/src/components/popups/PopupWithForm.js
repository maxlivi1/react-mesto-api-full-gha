import React from "react";
import { usePopupClose } from "../../hooks/usePopupClose";
import { AppContext } from "../../contexts/AppContext";

function PopupWithForm({
  title,
  name,
  submitName,
  isOpen,
  onSubmit,
  children,
}) {

  const { closeAllPopups } = React.useContext(AppContext);

  const styleName = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={styleName}>
      <div className="popup__container">
        <form
          name={name}
          className="popup__form"
          action="#"
          onSubmit={onSubmit}
        >
          <h3 className="popup__title">{title}</h3>
          <fieldset className="popup__editable-information">
            {children}
          </fieldset>
          <button className="button popup__btn-save" type="submit">
            {submitName}
          </button>
        </form>
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

export default PopupWithForm;
