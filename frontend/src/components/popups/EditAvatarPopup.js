import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../../contexts/AppContext";

export default function EditAvatarPopup({ isOpen, onUpdateUserAvatar }) {
  console.log("EditAvatarPopup");
  const { isLoading } = React.useContext(AppContext);

  const avatar = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUserAvatar({
      avatar: avatar.current.value
    });
  }

  useEffect(() => {
    console.log("EditAvatarPopup / useEffect / очистка поля аватара");
    if(!isOpen) {
      console.log("Поле добавления аватара очищено!");
      avatar.current.value = '';
    }
  }, [isOpen])

  return (
    <PopupWithForm
    title='Обновить аватар'
    name='change-avatar'
    submitName={isLoading ? 'Обновление...' : 'Сохранить'}
    isOpen={isOpen}
    onSubmit={handleSubmit}>
      <input
      ref={avatar}
      type="url"
      name="url"
      id="change-avatar-link"
      className="popup__input popup__input_type_job"
      placeholder="Введите url адрес нового аватара"
      autoComplete="off"
      required />
      <span className="change-avatar-link-error popup__input-error"></span>
    </PopupWithForm>
  )
}
