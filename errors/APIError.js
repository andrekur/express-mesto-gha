const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND,  } = require('http2').constants;

module.exports.APIError = (req, res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({message: err.message})
  }
  else if (err.name === ObjNotFoundError.name || err.name === "DocumentNotFoundError") {
    return res.status(404).send({message: err.message})
  }

  return res.status(HTTP_STATUS_NOT_FOUND).send({message: 'Мы уже чиним:)'})
};

class ObjNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "ObjNotFoundError";
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports.ObjNotFoundError = ObjNotFoundError