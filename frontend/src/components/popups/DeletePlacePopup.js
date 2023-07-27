import React from "react";
import { usePopupClose } from "../../hooks/usePopupClose";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, onDelete }) {

  usePopupClose(isOpen);

  function handleSubmit(event) {
    event.preventDefault();
    onDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-place"
      submitName="Да"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;
