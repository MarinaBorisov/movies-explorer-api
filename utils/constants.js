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
module.exports.MOVIES_NOT_FOUND = 'Фильмы не найдены';
module.exports.MOVIE_NOT_FOUND = 'Запрашиваемый фильм не найден';
module.exports.MOVIE_DELETION_FORBIDDEN = 'Удаление запрашиваемого фильма запрещено';
module.exports.USER_EXISTS_CODE = 11000;
module.exports.USER_EMAIL_EXISTS = 'Пользователь с таким email уже существует';
module.exports.CURRENT_USER_NOT_FOUND = 'Текущий пользователь не найден';
module.exports.REQUESTED_USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';
module.exports.INCORRECT_CREDENTIALS = 'Неправильные почта или пароль';
module.exports.WELCOME_MESSAGE = 'Добро пожаловать: ';
module.exports.GOODBYE_MESSAGE = 'Выход выполнен';
module.exports.AUTHORIZATION_REQUERED = 'Необходима авторизация';
module.exports.SERVER_ERROR_HAPPENED = 'На сервере произошла ошибка';
module.exports.REQUESTED_RESOURCE_NOT_FOUND = 'Запрашиваемый ресурс не найден';
