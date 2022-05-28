module.exports.ERROR_BAD_REQUEST = 400;
module.exports.ERROR_UNAUTHORISED = 401;
module.exports.ERROR_FORBIDDEN = 403;
module.exports.ERROR_NOT_FOUND = 404;
module.exports.ERROR_CONFLICT = 409;
module.exports.ERROR_DEFAULT = 500;
module.exports.CORS_OPTIONS = {
  origin: [
    'http://api.moretz.nomoreparties.sbs',
    'https://api.moretz.nomoreparties.sbs',
    'http://moretz.nomoreparties.sbs',
    'https://moretz.nomoreparties.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
};
