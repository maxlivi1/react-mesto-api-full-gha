export const cardCssOptions = {
  cardNameSelector: ".place__name",
  cardImageSelector: ".place__photo",
  buttonDeleteSelector: ".place__btn-delete",
  buttonLikeSelector: ".place__btn-like",
  buttonCounterLikesSelector: ".place__like-counter",
  buttonDeleteActiveClass: "place__btn-delete_active",
  buttonLikeActiveClass: "place__btn-like_active",
};

export const validatorConfig = {
  inputSelector: ".popup__input",
  inactiveButtonClass: "popup__btn-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
  inputErrorPostfix: "-error",
};

export const apiOptions = {
  headers: {
    base: {
      "Content-Type": "application/json",
    },
  },
  baseUrl: {
    base: "https://api.maxlivi.students.nomoredomains.xyz",
  },
  requestTo: {
    registration: "/signup",
    auth: "/signin",
    user: "/users/me",
    userAvatar: "/users/me/avatar",
    places: "/cards",
    likes: "/likes",
  },
};

export const messageType = {
  message: "message",
  error: "error",
  success: "success",
};

export const routes = {
  main: "/",
  registration: "/sign-up",
  entrance: "/sign-in",
};
