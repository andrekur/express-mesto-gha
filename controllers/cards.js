const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { link, name } = req.body;
  Card.create({ link, name })
    .then(card => res.send(card))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(res.send({'status': 204}))
    .catch(err => res.status(500).send({message: err.message}))
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