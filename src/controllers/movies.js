const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((card) => res.send({ data: card.reverse(), message: 'Фильмы найдены' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie, message: 'Фильм успешно добавлен' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const userId = req.user._id;
  const { movId } = req.params;

  Movie.findById(movId)
    .orFail(new NotFoundError('Фильм с указанным  _id не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError('Запрещено удалть чужие фильмы');
      }
      return movie.remove()
        .then(res.send({ message: 'Фильм успешно удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};
