const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, getSeltUser, updateSelfUser, updateSelfAvatar } = require('../controllers/users')

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)
  })
})

router.get('/', getUsers);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
}), updateSelfUser);
router.get('/me', getSeltUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(http|https?:\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+([/?].*)?$/)
  })
}), updateSelfAvatar);
router.get('/:userId', userIdValidator, getUser);

module.exports = router;