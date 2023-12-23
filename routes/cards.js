const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard, getCards, likeCard, dislikeCard, deleteCard } = require('../controllers/cards');

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
})

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(http|https?:\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+([/?].*)?$/)
  })
}), createCard);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;