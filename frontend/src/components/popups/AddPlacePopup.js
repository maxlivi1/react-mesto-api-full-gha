import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../../hooks/useForm";
import { AppContext } from "../../contexts/AppContext";

export default function AddPlacePopup({ isOpen, onAddPlace }) {

  const { isLoading } = React.useContext(AppContext);

  const { values, handleChangeValues, setValues } = useForm({
    name: "",
    url: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(values.name, values.url);
  }

  useEffect(() => {
    if (!isOpen) {
      setValues({ ...values, name: "", url: "" });
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      submitName={isLoading ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        value={values.name}
        onChange={handleChangeValues}
        name="name"
        id="add-form-name"
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Название"
        autoComplete="off"
        required
        minLength={2}
        maxLength={30}
      />
      <span className="add-form-name-error popup__input-error"></span>
      <input
        value={values.url}
        onChange={handleChangeValues}
        type="url"
        name="url"
        id="add-form-link"
        className="popup__input popup__input_type_job"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="add-form-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}
