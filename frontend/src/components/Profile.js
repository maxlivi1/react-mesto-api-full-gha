import React from "react";

function Profile({
  name,
  avatar,
  description,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
}) {
  return (
    <section className="profile">
      <div className="profile__avatar-wrapper">
        <img className="profile__avatar" src={avatar} alt="Аватар" />
        <button
          className="button profile__btn-change"
          type="button"
          aria-label="Изменить аватар"
          onClick={onEditAvatar}
        ></button>
      </div>
      <div className="profile__info">
        <h1 className="profile__user-name">{name}</h1>
        <button
          className="button profile__btn-edit"
          type="button"
          id="button_open-form"
          aria-label="Редактировать"
          onClick={onEditProfile}
        ></button>
        <p className="profile__user-information">{description}</p>
      </div>
      <button
        type="button"
        id="add-place-btn"
        className="button button_role_add-place"
        aria-label="Добавить"
        onClick={onAddPlace}
      ></button>
    </section>
  );
}

export default Profile;
