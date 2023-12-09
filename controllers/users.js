const User = require('../models/user')

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports.getUser = (req, res) => {
  User.find({_id: req.params.id})
    .then(user => res.send({data: user }))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports.updateSelfUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about, avatar }, {
      new: true,
      runValidators: true,
      upsert: false
    })
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports.updateSelfAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about, avatar }, {
      new: true,
      runValidators: true,
      upsert: false
    })
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: err.message}))
}