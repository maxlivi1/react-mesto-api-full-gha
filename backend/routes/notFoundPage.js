const notFoundPageRouter = require('express').Router();
const getNotFoundPageError = require('../controllers/notFoundPage');

notFoundPageRouter.use('/', getNotFoundPageError);

module.exports = notFoundPageRouter;
