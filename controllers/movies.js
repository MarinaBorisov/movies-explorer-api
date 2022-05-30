const NotFoundError = require('../errorModules/notFound');
const ForbiddenError = require('../errorModules/forbidden');
const { MOVIES_NOT_FOUND, MOVIE_NOT_FOUND, MOVIE_DELETION_FORBIDDEN } = require('../utils/constants');

const Movie = require('../models/movie');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink,
    thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getAllMyMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(MOVIES_NOT_FOUND);
      }
      res.send(movies);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (req.user._id !== movie.owner._id.toString()) {
        throw new ForbiddenError(MOVIE_DELETION_FORBIDDEN);
      }
      movie.remove()
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      next(err);
    });
};
