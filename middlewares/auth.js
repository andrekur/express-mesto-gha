const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/errors')

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'TEST_TOKEN');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  req.user = payload;

  next();
};
