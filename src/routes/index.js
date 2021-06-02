const router = require('express').Router();

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { validateUserLogin, validateUserBody } = require('../middlewares/validations');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserBody, createUser);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;
