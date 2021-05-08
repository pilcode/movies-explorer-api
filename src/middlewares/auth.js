const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization = '' } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      // попытаемся верифицировать токенq process.env.NODE_ENV !== 'production'
      payload = jwt.verify(token, process.env.JWT_SECRET || 'Secret_key');
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
    // записываем пейлоуд в объект запроса
    req.user = payload;
    // пропускаем запрос дальше
    next();
  }
};
