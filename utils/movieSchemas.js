const { Joi } = require('celebrate');
const { linkValidator } = require('../validators/linkValidator');
const { mongoIdValidator } = require('../validators/mongoIdValidator');

module.exports.movieCreateSchema = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(linkValidator),
    trailerLink: Joi.string().required().custom(linkValidator),
    thumbnail: Joi.string().required().custom(linkValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

module.exports.movieDeleteSchema = {
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(mongoIdValidator),
  }),
};
