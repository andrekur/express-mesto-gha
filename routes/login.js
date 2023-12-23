const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

inputDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
})

router.post('/signin', inputDataValidator, login);
router.post('/signup', inputDataValidator, createUser);

module.exports = router;