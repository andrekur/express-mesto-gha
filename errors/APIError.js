const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND } = require('http2').constants;

module.exports.APIError = (req, res, err) => {
  console.log('name', err.name, ObjNotFoundError.name)
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({message: err.message})
  }
  else if (err.name === ObjNotFoundError.name) {
    return res.status(err.statusCode).send({message: err.message})
  }

  return res.status(500).send({message: 'Мы уже чиним:)'})
};

class ObjNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "ObjNotFoundError";
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports.ObjNotFoundError = ObjNotFoundError