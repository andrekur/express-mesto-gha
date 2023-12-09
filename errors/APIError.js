const { HTTP_STATUS_BAD_REQUEST  } = require('http2').constants;

module.exports.APIError = (req, res, err) => {
  console.log(err.name)
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({message: err.message})
  }


  return res.status(500).send({message: 'Мы уже чиним:)'})
};
