require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS_OPTIONS } = require('./utils/constants');
const commonErrorHandler = require('./middlewares/commonErrorHandler');
const limiter = require('./middlewares/limiter');

const app = express();
const { PORT = 3000 } = process.env;
const { DB_CONNECT = 'mongodb://localhost:27017/moviesdb' } = process.env;

mongoose.connect(DB_CONNECT);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(commonErrorHandler);
app.listen(PORT, () => {
});
