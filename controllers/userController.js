const User = require('../schemas/user')

exports.postUser = (req, res) => {
  console.log(req.body)
  const newUser = new User(req.body)
  newUser.save((err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(newUser)
  })
}

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(users)
  })
}

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(user)
  })
}

exports.editUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {name: req.body.name, date: req.body.date}, (err, user) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(user)
  })
}

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send('User removed from the database')
  })
}