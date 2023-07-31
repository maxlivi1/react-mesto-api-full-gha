const { STATUS_CODES } = require('../utils/constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.code = STATUS_CODES.UNAUTHORIZED_ERROR;
  }
}

module.exports = AuthError;
