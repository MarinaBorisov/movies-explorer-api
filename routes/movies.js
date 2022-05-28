const routerMovies = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkValidator } = require('../validators/linkValidator');
const { intValidator } = require('../validators/intValidator');
const { mongoIdValidator } = require('../validators/mongoIdValidator');

const {
  createMovie, getAllMovies, deleteMovie,
} = require('../controllers/movies');

routerMovies.get('/', getAllMovies);

routerMovies.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required().custom(intValidator),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(linkValidator),
    trailerLink: Joi.string().required().custom(linkValidator),
    thumbnail: Joi.string().required().custom(linkValidator),
    movieId: Joi.string().required().custom(mongoIdValidator),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

routerMovies.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(mongoIdValidator),
  }),
}), deleteMovie);

module.exports = {
  routerMovies,
};
