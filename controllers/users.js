const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const { APIError } = require('../errors/APIError')
const {HTTP_STATUS_CREATED} = require('http2').constants

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(err => APIError(req, res, err))
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId).orFail()
    .then(user => res.send(user))
    .catch(err => APIError(req, res, err))
}

module.exports.updateSelfUser = (req, res) => {
  const { name, about } = req.body;
  updateUserData(req.user._id, {name, about})
    .then(user => res.send(user))
    .catch(err => APIError(req, res, err))
}

module.exports.updateSelfAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUserData(req.user._id, {avatar})
    .then(user => res.send(user))
    .catch(err => APIError(req, res, err))
}

const updateUserData = (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).orFail()
}

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send({
        _id: user._id,
        email: user.email,
      });
    })
    // TODO add global err
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'TEST_TOKEN', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
