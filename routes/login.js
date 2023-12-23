const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

inputDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().optional().min(2).max(30),
    about: Joi.string().optional().min(2).max(30),
    link: Joi.string().optional().pattern(/^(http|https?:\/\/)?(www\.)?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+([/?].*)?$/)
  })
})

router.post('/signin', inputDataValidator, login);
router.post('/signup', inputDataValidator, createUser);

module.exports = router;