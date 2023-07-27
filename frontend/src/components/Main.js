import React from "react";
import Profile from "./Profile";
import Places from "./Places";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <Profile
        name={currentUser && currentUser.name}
        avatar={currentUser && currentUser.avatar}
        description={currentUser && currentUser.about}
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
      />
      <Places onCardClick={onCardClick}>
        {cards.map((placeData) => (
          <Card
            place={placeData}
            key={placeData._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </Places>
    </main>
  );
}

export default Main;
