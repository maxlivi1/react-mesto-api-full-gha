import { authApiOptions as authOptions } from "./constants";

class AuthApi {
  constructor(options) {
    this._options = options;
    this._baseUrl = "https://auth.nomoreparties.co";
  }

  _checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  };

  _request(endpoint, requestOptions) {
    return fetch(`${this._baseUrl}${endpoint}`, requestOptions).then(
      this._checkResponse
    );
  }

  register({ email, password }) {
    return this._request(this._options.requestTo.registration, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({ password, email }),
    });
  }

  auth({ email, password }) {
    return this._request(this._options.requestTo.auth, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({ password, email }),
    });
  }

  checkToken(token) {
    return this._request(this._options.requestTo.checkToken, {
      method: "GET",
      headers: { ...this._options.headers, Authorization: `Bearer ${token}` },
    });
  }
}

export const authApi = new AuthApi(authOptions);
