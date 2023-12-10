const User = require('../models/user')
const { APIError } = require('../errors/APIError')

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => APIError(req, res, err))
}

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