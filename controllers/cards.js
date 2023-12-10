const Card = require('../models/card');
const { HTTP_STATUS_OK  } = require('http2').constants;
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
  getObjOrError(Card, req.params.cardId)
    .then(() => {
      Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.status(HTTP_STATUS_OK).send({}))
        .catch(err => APIError(req, res, err))
    })
    .catch(err => APIError(req, res, err))
}

module.exports.likeCard = (req, res) => {
  getObjOrError(Card, req.params.cardId)
    .then(() => {
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
        .then(card => card.populate(['likes', 'owner']))
        .then(card => res.send(card))
        .catch(err => APIError(req, res, err))
    })
    .catch(err => APIError(req, res, err))
}

module.exports.dislikeCard = (req, res) => {
  getObjOrError(Card, req.params.cardId)
    .then(() => {
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        .then(card => card.populate(['likes', 'owner']))
        .then(card => res.send(card))
        .catch(err => APIError(req, res, err))
    })
    .catch(err => APIError(req, res, err))
}