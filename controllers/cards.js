const Card = require('../models/card');
const { HTTP_STATUS_OK  } = require('http2').constants;
const { ForbiddenRequestError } = require('../errors/errors')


module.exports.createCard = (req, res, next) => {
  const { link, name } = req.body;
  Card.create({ link, name, owner: req.user._id })
    .then(card => card.populate('owner'))
    .then(card => res.send(card))
    .catch(next)
}

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(next)
}

module.exports.deleteCard = (req, res, next) => {
  Card.findById({_id: req.params.cardId}).orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenRequestError('Отказано в доступе')
      }

      Card.deleteOne()
        .then(() => res.status(HTTP_STATUS_OK).send({}))
        .catch(next)
    })
    .catch(next)
}

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then(card => card.populate(['likes', 'owner']))
    .then(card => res.send(card))
    .catch(next)
}

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
  ).orFail()
    .then(card => card.populate(['likes', 'owner']))
    .then(card => res.send(card))
    .catch(next)
}