const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_CONNECT } = require('./config');
const { CORS_OPTIONS } = require('./utils/constants');
const commonErrorHandler = require('./middlewares/commonErrorHandler');
const limiter = require('./middlewares/limiter');

const app = express();
app.use(requestLogger);
app.use(limiter);

mongoose.connect(DB_CONNECT);

app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(commonErrorHandler);
app.listen(PORT, () => {
});
