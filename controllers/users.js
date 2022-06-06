const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errorModules/notFound');
const ConflictError = require('../errorModules/conflict');
const UnauthorizedError = require('../errorModules/unauthorized');
const {
  USER_EXISTS_CODE, USER_EMAIL_EXISTS, CURRENT_USER_NOT_FOUND,
  REQUESTED_USER_NOT_FOUND, INCORRECT_CREDENTIALS,
  WELCOME_MESSAGE, GOODBYE_MESSAGE,
} = require('../utils/constants');
const { JWT_SECRET } = require('../config');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(CURRENT_USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then(() => res.send({
      email, name, about, avatar,
    }))
    .catch((err) => {
      if (err.code === USER_EXISTS_CODE) {
        next(new ConflictError(USER_EMAIL_EXISTS));
      } else {
        next(err);
      }
    });
};

module.exports.editUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(REQUESTED_USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === USER_EXISTS_CODE) {
        next(new ConflictError(USER_EMAIL_EXISTS));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: WELCOME_MESSAGE + user.name });
    })
    .catch(() => {
      next(new UnauthorizedError(INCORRECT_CREDENTIALS));
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: GOODBYE_MESSAGE });
};
