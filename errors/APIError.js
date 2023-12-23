const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const { UnauthorizedError, ConflictReqiestError, ForbiddenRequestError } = require('./errors')

module.exports.APIError = (req, res, err, next) => {

  if (err instanceof ValidationError  || err instanceof CastError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({message: err.message})
  }
  else if (err instanceof DocumentNotFoundError) {
    return res.status(HTTP_STATUS_NOT_FOUND).send({message: err.message})
  }
  else if (err instanceof UnauthorizedError || err instanceof ForbiddenRequestError || err instanceof ConflictReqiestError) {
    return res.status(err.statusCode).send({message: err.message})
  }

  return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
};