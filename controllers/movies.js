const NotFoundError = require('../errorModules/notFound');
const ForbiddenError = require('../errorModules/forbidden');
const BadRequestError = require('../errorModules/badRequest');

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
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Некорректные данные ${err}`));
      } else {
        next(err);
      }
    });
};

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Фильмы не найдены');
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
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      if (req.user._id !== movie.owner._id.toString()) {
        throw new ForbiddenError('Удаление запрашиваемого фильма запрещено');
      }
      movie.remove()
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неправильный id'));
      } else {
        next(err);
      }
    });
};
