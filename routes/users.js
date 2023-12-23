const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, updateSelfUser, updateSelfAvatar } = require('../controllers/users')

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
}), updateSelfUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().pattern(/^(http|https?:\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+([/?].*)?$/)
  })
}), updateSelfAvatar);

module.exports = router;