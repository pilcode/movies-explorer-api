const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле обязательно для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (v) => isURL(v),
      message: ({ value }) => `${value} не является URL`,
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (v) => isURL(v),
      message: ({ value }) => `${value} не является URL`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (v) => isURL(v),
      message: ({ value }) => `${value} не является URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле обязательно для заполнения'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле обязательно для заполнения'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
  },

});

module.exports = mongoose.model('movie', movieSchema);
