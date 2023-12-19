const Card = require('../models/card');
const { HTTP_STATUS_OK  } = require('http2').constants;
const { APIError } = require('../errors/APIError')


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
  Card.findByIdAndDelete(req.params.cardId).orFail()
    .then(() => res.status(HTTP_STATUS_OK).send({}))
    .catch(err => APIError(req, res, err))
}

// TODO вынести общий компонент
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then(card => card.populate(['likes', 'owner']))
    .then(card => res.send(card))
    .catch(err => APIError(req, res, err))
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
  ).orFail()
    .then(card => card.populate(['likes', 'owner']))
    .then(card => res.send(card))
    .catch(err => APIError(req, res, err))
}