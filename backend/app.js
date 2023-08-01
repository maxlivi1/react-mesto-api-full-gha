const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const notFoundPageRouter = require('./routes/notFoundPage');
const { login, registration, logout } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { URL_PATTERN } = require('./utils/constants');
const limiter = require('./helpers/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { SERVER_PORT, DB_URL } = require('./envconfig');

const app = express();
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
    xPoweredBy: false,
  }),
);

app.use(cors({
  origin: ['http://localhost:3000', 'https://maxlivi.students.nomoredomains.xyz'],
  credentials: true,
  maxAge: 120,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(100),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(100),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_PATTERN),
  }),
}), registration);
app.get('/logout', auth, logout);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', auth, notFoundPageRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log('Слушаю порт:', SERVER_PORT);
});
