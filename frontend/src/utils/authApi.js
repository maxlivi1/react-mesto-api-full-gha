import { apiOptions } from "./constants";

class AuthApi {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl.auth;
  }

  _checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  };

  _request(endpoint, requestOptions) {
    return fetch(`${this._baseUrl}${endpoint}`, { ...requestOptions, credentials: 'include' }).then(
      this._checkResponse
    );
  }

  register({ email, password }) {
    return this._request(this._options.requestTo.registration, {
      method: "POST",
      headers: this._options.headers.registration,
      body: JSON.stringify({ password, email }),
    });
  }

  auth({ email, password }) {
    return this._request(this._options.requestTo.auth, {
      method: "POST",
      headers: this._options.headers.registration,
      body: JSON.stringify({ password, email }),
    });
  }

  checkToken() {
    return this._request(this._options.requestTo.user, {
      headers: this._options.headers.base,
    });
  }
}

export const authApi = new AuthApi(apiOptions);
