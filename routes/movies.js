const routerMovies = require('express').Router();
const { celebrate } = require('celebrate');
const { movieCreateSchema, movieDeleteSchema } = require('../utils/movieSchemas');

const {
  createMovie, getAllMyMovies, deleteMovie,
} = require('../controllers/movies');

routerMovies.get('/', getAllMyMovies);

routerMovies.post('/', celebrate(movieCreateSchema), createMovie);

routerMovies.delete('/:movieId', celebrate(movieDeleteSchema), deleteMovie);

module.exports = {
  routerMovies,
};
