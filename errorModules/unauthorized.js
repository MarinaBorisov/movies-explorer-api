const { ERROR_UNAUTHORISED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORISED;
  }
}

module.exports = UnauthorizedError;
