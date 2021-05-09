require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const rateLimiter = require('./middlewares/rate-limiter');

const { PORT = 3000 } = process.env;

const app = express();

app.use(rateLimiter);

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mongoBD = 'mongodb://localhost:27017/bitfilmsdb-dev';

if (process.env.NODE_ENV === 'production') {
  mongoBD = process.env.MONGODB;
}

mongoose.connect(mongoBD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
