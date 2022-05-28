const validator = require('validator');

module.exports.intValidator = (value, helpers) => {
  if (!validator.isInt(value)) {
    return helpers.error('any.invalid');
  }

  return value;
};
