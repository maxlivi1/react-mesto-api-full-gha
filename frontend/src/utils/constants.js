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
    authorization: "c6eeac48-21b1-4b11-8e1a-276b18a235ea",
    "Content-Type": "application/json",
  },
  requestTo: {
    user: "/users/me",
    userAvatar: "/users/me/avatar",
    places: "/cards",
    likes: "/likes",
  },
};

export const authApiOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  requestTo: {
    registration: "/signup",
    auth: "/signin",
    checkToken: "/users/me",
  },
};

export const messageType = {
  message: "message",
  error: "error",
  success: "success",
};

export const routes = {
  main: '/',
  registration: '/sign-up',
  entrance: '/sign-in'
}
