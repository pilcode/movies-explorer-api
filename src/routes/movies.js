const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  validateMovie,
  validateMovieById,
} = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movId', validateMovieById, deleteMovieById);

module.exports = router;
