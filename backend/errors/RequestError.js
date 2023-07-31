const { STATUS_CODES } = require('../utils/constants');

class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestError';
    this.code = STATUS_CODES.BAD_REQUEST_ERROR;
  }
}

module.exports = RequestError;
