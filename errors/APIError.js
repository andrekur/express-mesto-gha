const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;

module.exports.APIError = (req, res, err) => {
  console.log(err)
  if (err instanceof ValidationError  || err instanceof CastError) {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({message: err.message})
  }
  else if (err instanceof DocumentNotFoundError) {
    return res.status(HTTP_STATUS_NOT_FOUND).send({message: err.message})
  }

  return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'Мы уже чиним:)'})
};