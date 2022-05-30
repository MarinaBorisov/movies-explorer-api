const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errorModules/unauthorized');
const { JWT_SECRET } = require('../config');
const { AUTHORIZATION_REQUERED } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_REQUERED));
  }
  req.user = payload;
  next();
};

module.exports = auth;
