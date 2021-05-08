const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user, message: 'Пользователи найдены' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  if (!password) {
    next(new BadRequestError('Переданы некорректные данные'));
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
      }))
      .then((user) => res.status(201).send({ data: user.toJSON(), message: 'Пользователь успешно создан' }))
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует'));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные'));
        } else {
          next(err);
        }
      });
  }
};

module.exports.getUserByToken = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      res.status(200).send({ data: user, message: 'Пользователь найден' });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      res.status(200).send({ data: user, message: 'Данные пользователя успешно обновлены' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'Secret_key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильные почта или пароль'));
    });
};
