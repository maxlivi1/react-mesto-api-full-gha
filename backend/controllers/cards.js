const mongoose = require('mongoose');
const Card = require('../models/card');
const { STATUS_CODES } = require('../utils/constants');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CODES.CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new RequestError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new RequestError('Переданы некорректные данные для постановки/снятии лайка'));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new RequestError('Переданы некорректные данные для постановки/снятии лайка'));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => {
      if (_id !== card.owner.toString()) {
        next(new ForbiddenError('У вас не достаточно прав для данной операции'));
        return;
      }
      Card.deleteOne({ _id: card._id })
        .then(() => res.send(card))
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new RequestError('Переданы некорректные данные карточки'));
            return;
          }
          next(err);
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new RequestError('Переданы некорректные данные карточки'));
        return;
      }
      next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
