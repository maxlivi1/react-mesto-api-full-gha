import React from "react";
import noPhoto from "../images/no-photo.jpg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ place, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleImageNoLoad = (event) => {
    event.target.src = noPhoto;
  };

  const handleCardClick = () => {
    onCardClick(place);
  };

  const handleCardLike = () => {
    onCardLike(place);
  };

  const handleDeleteClick = () => {
    onCardDelete(place);
  };

  const isOwner = place.owner === currentUser._id;
  const isLiked = place.likes.some((userId) => userId === currentUser._id);

  const likeButtonClassName = `button place__btn-like ${
    isLiked && "place__btn-like_active"
  }`;

  return (
    <article className="place">
      <div className="place__photo-link">
        <img
          className="place__photo"
          src={place.link}
          alt={`Фото ${place.name}`}
          onClick={handleCardClick}
          onError={handleImageNoLoad}
        />
      </div>
      <div className="place__info">
        <h2 className="place__name">{place.name}</h2>
        <div className="place__like-wrapper">
          <button
            type="button"
            className={likeButtonClassName}
            onClick={handleCardLike}
            aria-label="Поставить лайк"
          ></button>
          <p className="place__like-counter">{place.likes.length}</p>
        </div>
      </div>
      {isOwner && (
        <button
          type="button"
          className="button place__btn-delete"
          onClick={handleDeleteClick}
          aria-label="Удалить"
        ></button>
      )}
    </article>
  );
}

export default Card;
