const Card = require('../models/card');
const { HTTP_STATUS_NO_CONTENT  } = require('http2').constants;
const { APIError } = require('../errors/APIError')
const { getObjOrError } = require('../utils/utils')


module.exports.createCard = (req, res) => {
  const { link, name } = req.body;
  Card.create({ link, name, owner: req.user._id })
    .then(card => card.populate('owner'))
    .then(card => res.send(card))
    .catch(err => APIError(req, res, err))
}

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(err => APIError(req, res, err))
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(res.status(HTTP_STATUS_NO_CONTENT).send())
    .catch(err => APIError(req, res, err))
}

module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then(card => res.send(card))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
}