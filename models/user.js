const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errorModules/unauthorized');
const { INCORRECT_CREDENTIALS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function checkUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INCORRECT_CREDENTIALS);
      }

      return bcrypt.compare(password, user.password)
        .then((isMatched) => {
          if (!isMatched) {
            throw new UnauthorizedError(INCORRECT_CREDENTIALS);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
