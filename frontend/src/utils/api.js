import { apiOptions } from "./constants";

class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl.base;
  }

  _checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status} : ${response.statusText}`);
  };

  _request(endpoint, requestOptions) {
    return fetch(`${this._baseUrl}${endpoint}`, { ...requestOptions, credentials: 'include' }).then(
      this._checkResponse
    );
  }

  register({ email, password }) {
    return this._request(this._options.requestTo.registration, {
      method: "POST",
      headers: this._options.headers.base,
      body: JSON.stringify({ password, email }),
    });
  }

  auth({ email, password }) {
    return this._request(this._options.requestTo.auth, {
      method: "POST",
      headers: this._options.headers.base,
      body: JSON.stringify({ password, email }),
    });
  }

  logout() {
    return this._request(this._options.requestTo.logout, {
      headers: this._options.headers.base,
    });
  }

  checkToken() {
    return this._request(this._options.requestTo.user, {
      headers: this._options.headers.base
    });
  }

  getInitialPlaces() {
    return this._request(this._options.requestTo.places, {
      headers: this._options.headers.base
    });
  }

  createPlace({ placeName, imageUrl }) {
    return this._request(this._options.requestTo.places, {
      method: "POST",
      headers: this._options.headers.base,
      body: JSON.stringify({ name: placeName, link: imageUrl }),
    });
  }

  deletePlace(placeId) {
    return this._request(`${this._options.requestTo.places}/${placeId}`, {
      method: "DELETE",
      headers: this._options.headers.base,
    });
  }

  getUser() {
    return this._request(this._options.requestTo.user, {
      headers: this._options.headers.base
    });
  }

  updateUserInfo({ newName, newInfo }) {
    return this._request(this._options.requestTo.user, {
      method: "PATCH",
      headers: this._options.headers.base,
      body: JSON.stringify({ name: newName, about: newInfo }),
    });
  }

  updateUserAvatar({ newAvatar }) {
    return this._request(this._options.requestTo.userAvatar, {
      method: "PATCH",
      headers: this._options.headers.base,
      body: JSON.stringify({ avatar: newAvatar }),
    });
  }

  _createLikePlace(placeId) {
    return this._request(
      `${this._options.requestTo.places}/${placeId}${this._options.requestTo.likes}`,
      {
        method: "PUT",
        headers: this._options.headers.base,
      }
    );
  }

  _deleteLikePlace(placeId) {
    return this._request(
      `${this._options.requestTo.places}/${placeId}${this._options.requestTo.likes}`,
      {
        method: "DELETE",
        headers: this._options.headers.base,
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
