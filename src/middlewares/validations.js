const { celebrate, Joi } = require('celebrate');
// const { ObjectId } = require('mongoose').Types;
// const { isURL, isEmail } = require('validator');
const { isEmail } = require('validator');

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
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
  }),
});

module.exports = {
  validateUserLogin,
  validateUpdateUser,
  validateUserBody,
  // validateUser,
  // validateAvatar,
  // validateCard,
  // validateCardById,
};
