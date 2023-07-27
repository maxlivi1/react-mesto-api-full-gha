import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../../hooks/useForm";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {

  const { isLoading } = React.useContext(AppContext);

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChangeValues, setValues } = useForm({
    name: "",
    about: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setValues({
        ...values,
        name: currentUser.name,
        about: currentUser.about,
      });
    } else {
      setValues({ ...values, name: "", about: "" });
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      submitName={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        value={values.name}
        onChange={handleChangeValues}
        name="name"
        id="edit-form-name"
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Ваше имя"
        autoComplete="off"
        required
        minLength={2}
        maxLength={40}
      />
      <span className="edit-form-name-error popup__input-error"></span>
      <input
        value={values.about}
        onChange={handleChangeValues}
        name="about"
        id="edit-form-information"
        className="popup__input popup__input_type_job"
        type="text"
        placeholder="Ваша профессия или призвание"
        autoComplete="off"
        required
        minLength={2}
        maxLength={200}
      />
      <span className="edit-form-information-error popup__input-error"></span>
    </PopupWithForm>
  );
}
