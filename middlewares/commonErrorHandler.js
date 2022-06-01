const { ERROR_DEFAULT } = require('../utils/constants');
const { SERVER_ERROR_HAPPENED } = require('../utils/constants');

const commonErrorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message } = err;
  res.status(statusCode).send(
    { message: statusCode === ERROR_DEFAULT ? SERVER_ERROR_HAPPENED : message },
  );
  next();
};

module.exports = commonErrorHandler;
