import { apiOptions } from "./constants";

class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-64";
  }

  _checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status} : ${response.statusText}`);
  };

  _request(endpoint, requestOptions) {
    return fetch(`${this._baseUrl}${endpoint}`, requestOptions).then(
      this._checkResponse
    );
  }

  getInitialPlaces() {
    return this._request(this._options.requestTo.places, {
      headers: this._options.headers,
    });
  }

  createPlace({ placeName, imageUrl }) {
    return this._request(this._options.requestTo.places, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({ name: placeName, link: imageUrl }),
    });
  }

  deletePlace(placeId) {
    return this._request(`${this._options.requestTo.places}/${placeId}`, {
      method: "DELETE",
      headers: this._options.headers,
    });
  }

  getUser() {
    return this._request(this._options.requestTo.user, {
      headers: this._options.headers,
    });
  }

  updateUserInfo({ newName, newInfo }) {
    return this._request(this._options.requestTo.user, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ name: newName, about: newInfo }),
    });
  }

  updateUserAvatar({ newAvatar }) {
    return this._request(this._options.requestTo.userAvatar, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ avatar: newAvatar }),
    });
  }

  _createLikePlace(placeId) {
    return this._request(
      `${this._options.requestTo.places}/${placeId}${this._options.requestTo.likes}`,
      {
        method: "PUT",
        headers: this._options.headers,
      }
    );
  }

  _deleteLikePlace(placeId) {
    return this._request(
      `${this._options.requestTo.places}/${placeId}${this._options.requestTo.likes}`,
      {
        method: "DELETE",
        headers: this._options.headers,
      }
    );
  }

  changeLikePlaceStatus(placeId, isLiked) {
    if (isLiked) {
      return this._deleteLikePlace(placeId);
    } else {
      return this._createLikePlace(placeId);
    }
  }
}

export const api = new Api(apiOptions);
