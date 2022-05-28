const validator = require('validator');

module.exports.mongoIdValidator = (value, helpers) => {
  if (!validator.isMongoId(value)) {
    return helpers.error('any.invalid');
  }

  return value;
};
