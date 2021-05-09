const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const { isURL, isEmail } = require('validator');

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (!isEmail(value)) return helpers.error('Невалидный email');
      return value;
    })
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (!isEmail(value)) return helpers.error('Невалидный email');
      return value;
    })
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (!isEmail(value)) return helpers.error('Невалидный email');
      return value;
    })
      .messages({
        'any.required': 'Поле "email" не передано',
        'string.empty': 'Поле "email" не заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string().required().min(4).max(10)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 4',
        'string.max': 'Максимальная длина поля "name" - 10',
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required().min(2).max(50)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 50',
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value, { require_protocol: true })) return helpers.error('Невалидный URL');
      return value;
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value, { require_protocol: true })) return helpers.error('Невалидный URL');
      return value;
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (!isURL(value, { require_protocol: true })) return helpers.error('Невалидный URL');
      return value;
    }),
    nameRU: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

const validateMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный movieId');
    }),
  }),
});

module.exports = {
  validateUserLogin,
  validateUpdateUser,
  validateUserBody,
  validateMovie,
  validateMovieById,
};
