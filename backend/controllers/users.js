const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');
const { getJwtToken } = require('../helpers/jwt');
const RegistrationError = require('../errors/RegistrationError');
const RequestError = require('../errors/RequestError');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');

const registration = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CODES.CREATED)
      .send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new RegistrationError('Пользователь с таким email уже зарегистрирован'));
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new RequestError('Переданы некорректные данные при создании пользователя'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthError('Неверно указан логин или пароль');

      bcrypt.compare(password, user.password, (err, isValid) => {
        try {
          if (!isValid || err) {
            throw new AuthError('Неверно указан логин или пароль');
          }
          const token = getJwtToken(user._id);
          res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: 'none',
              secure: true,
            })
            .send({ message: 'Вы авторизованы' });
        } catch (error) {
          next(error);
        }
      });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: 'Пользователь разлогинен.' });
  } catch (error) {
    next(error);
  }
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new RequestError('Переданы некорректные данные пользователя'));
        return;
      }
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new RequestError('Переданы некорректные данные пользователя'));
        return;
      }
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError
        || err instanceof mongoose.Error.ValidationError) {
        next(new RequestError('Переданы некорректные данные при обновлении профиля'));
        return;
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send({ avatar: user.avatar }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError
        || err instanceof mongoose.Error.ValidationError) {
        next(new RequestError('Переданы некорректные данные при обновлении аватара'));
        return;
      }
      next(err);
    });
};

module.exports = {
  registration,
  getUserInfo,
  getUser,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
  login,
  logout,
};
