const User = require('../schemas/user')

exports.postUser = (req, res) => {
  const newUser = new User(req.body)
  newUser.save((err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'User created successfully'})
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
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    surname: req.body.surname,
    index: req.body.index,
    password: req.body.password,
    email: req.body.email,
    isStudent: req.body.isStudent
  }, (err, user) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'User updated successfully'})
  })
}

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'User removed from the database'})
  })
}