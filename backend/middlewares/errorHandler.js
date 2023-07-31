const AuthError = require('../errors/AuthError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const RegistrationError = require('../errors/RegistrationError');
const RequestError = require('../errors/RequestError');
const { STATUS_CODES } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { code = STATUS_CODES.INTERNAL_SERVER_ERROR } = err;

  if (err instanceof AuthError || err instanceof ForbiddenError || err instanceof NotFoundError
     || err instanceof RegistrationError || err instanceof RequestError) {
    res.status(err.code).send({ message: err.message });
    return;
  }
  res.status(code).send({ message: 'Что-то пошло не так. Ошибка сервера.' });
  next();
};

module.exports = { errorHandler };
