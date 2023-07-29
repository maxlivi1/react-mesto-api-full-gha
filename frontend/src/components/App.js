import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./popups/ImagePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import EditProfilePopup from "./popups/EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import MessagePopup from "./popups/MessagePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import { messageType as typeOfMessage, routes } from "../utils/constants";
import InfoTooltip from "./popups/InfoTooltip";
import DeletePlacePopup from "./popups/DeletePlacePopup";
import MobilNavigationPanel from "./MobilNavigationPanel";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isErrorTooltip, setIsErrorTooltip] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const showMessage = ({ text, type }) => {
    setMessage(text);
    setMessageType(type);
    setIsMessagePopupOpen(true);
    setTimeout(() => {
      setIsMessagePopupOpen(false);
    }, 5000);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      ...selectedCard,
      ...{ name: card.name, link: card.link },
    });
  };

  const handleMenuButtonClick = () => {
    setIsOpenUserInfo(true);
  };

  const handleCloseMenuButtonClick = () => {
    setIsOpenUserInfo(false);
  };

  const getAppData = () => {
    Promise.all([api.getUser(), api.getInitialPlaces()])
      .then(([userData, placesData]) => {
        setCurrentUser((prev) => ({ ...prev, ...userData }));
        setCards((prev) => [...prev, ...placesData]);
        showMessage({
          text: "Данные с сервера успешно загружены",
          type: typeOfMessage.message,
        });
      })
      .catch((error) => {
        showMessage({
          text: `Данные с сервера не загружены: ${error}`,
          type: typeOfMessage.error,
        });
      });
  };

  const checkToken = () => {
    api
        .checkToken()
        .then((userData) => {
          setUserEmail(userData.email);
          setLoggedIn(true);
          navigate(routes.main, { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });

  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, ...{ name: "", link: "" } });
  };

  const handleUpdateUser = ({ name, about }) => {
    if (
      !name.trim() ||
      !about.trim() ||
      (name.trim() === currentUser.name && about.trim() === currentUser.about)
    ) {
      return null;
    }
    setIsLoading(true);
    api
      .updateUserInfo({ newName: name.trim(), newInfo: about.trim() })
      .then((updatedUserData) => {
        setCurrentUser((prev) => ({ ...prev, ...updatedUserData }));
        closeAllPopups();
        showMessage({
          text: `Данные пользователя обновлены`,
          type: typeOfMessage.message,
        });
      })
      .catch((error) => {
        showMessage({
          text: `Данные пользователя не обновлены: ${error}`,
          type: typeOfMessage.error,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUserAvatar = ({ avatar }) => {
    if (!avatar.trim()) return null;
    setIsLoading(true);
    api
      .updateUserAvatar({ newAvatar: avatar.trim() })
      .then((updatedUserData) => {
        setCurrentUser((prev) => ({ ...prev, ...updatedUserData }));
        closeAllPopups();
        showMessage({
          text: `Аватар пользователя обновлён`,
          type: typeOfMessage.message,
        });
      })
      .catch((error) => {
        showMessage({
          text: `Аватар текущего пользователя не обновлён: ${error}`,
          type: typeOfMessage.error,
        });
      })
      .finally(() => setIsLoading(false));
  };

  function handleAddPlaceSubmit(name, url) {
    if (!name.trim() || !url.trim()) return null;
    setIsLoading(true);
    api
      .createPlace({ placeName: name, imageUrl: url })
      .then((newPlaceData) => {
        setCards((prev) => [newPlaceData, ...prev]);
        closeAllPopups();
        showMessage({
          text: `Новое место успешно добавлено`,
          type: typeOfMessage.message,
        });
      })
      .catch((error) => {
        showMessage({
          text: `Новое место не добавлено: ${error}`,
          type: typeOfMessage.error,
        });
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);
    api
      .changeLikePlaceStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(`Лайк не поставлен: ${error}`);
      });
  }

  function handleDeleteCard(card) {
    api
      .deletePlace(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        showMessage({
          text: `Пост успешно удалён`,
          type: typeOfMessage.message,
        });
      })
      .catch((error) => {
        showMessage({
          text: `Пост не удалён: ${error}`,
          type: typeOfMessage.error,
        });
      });
  }

  function handleRegistrationClick({ email, password }) {
    setIsSubmitDisable(true);

    api
      .register({ email, password })
      .then(() => {
        navigate(routes.entrance, { replace: true });
        setIsErrorTooltip(false);
        setIsTooltipOpen(true);
      })
      .catch(() => {
        setIsTooltipOpen(true);
        setIsErrorTooltip(true);
      })
      .finally(() => {
        setIsSubmitDisable(false);
      });
  }

  function handleAuthClick({ email, password }) {
    setIsSubmitDisable(true);

    api
      .auth({ email, password })
      .then(() => {
        setUserEmail(email);
        setLoggedIn(true);
        navigate(routes.main, { replace: true });
      })
      .catch((resError) => {
        console.log(resError.status, resError.statusText);
        setIsTooltipOpen(true);
        setIsErrorTooltip(true);
      })
      .finally(() => {
        setIsSubmitDisable(false);
      });
  }

  function handleExit() {
    setLoggedIn(false);
    setCards([]);
    setIsOpenUserInfo(false);
    navigate(routes.entrance, { replace: true });
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getAppData();
    }
  }, [loggedIn]);

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <MobilNavigationPanel
            isOpen={isOpenUserInfo}
            userEmail={userEmail}
            onSignOut={handleExit}
          />
          <Header
            isOpenUserInfo={isOpenUserInfo}
            userEmail={userEmail}
            onSignOut={handleExit}
            onShow={handleMenuButtonClick}
            onHide={handleCloseMenuButtonClick}
            loggedIn={loggedIn}
          />
          <Routes>
            <Route
              path={routes.main}
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCard}
                />
              }
            />
            <Route
              path={routes.registration}
              element={
                <Register
                  onRegister={handleRegistrationClick}
                  isSubmitDisable={isSubmitDisable}
                />
              }
            />
            <Route
              path={routes.entrance}
              element={
                <Login
                  onLogin={handleAuthClick}
                  isSubmitDisable={isSubmitDisable}
                />
              }
            />
          </Routes>
          {loggedIn && <Footer />}
          <ImagePopup placeCard={selectedCard} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateUserAvatar={handleUpdateUserAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeletePlacePopup isOpen={isDeletePlacePopupOpen} />
          <InfoTooltip
            name="info-tooltip"
            isOpen={isTooltipOpen}
            isError={isErrorTooltip}
          />
          <MessagePopup
            message={message}
            type={messageType}
            isOpen={isMessagePopupOpen}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
