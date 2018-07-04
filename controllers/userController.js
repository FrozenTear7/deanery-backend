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
  User.find({})
    .populate('subjects')
    .populate('grades')
    .exec((err, users) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(users)
    })
}

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .populate('subjects')
    .populate({path: 'grades', populate: {path: 'subject', model: 'Subject'}})
    .exec((err, user) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(user)
    })
}

exports.editUser = (req, res) => {
  let subjectList = []
  let gradeList = []

  if (req.body.subjects)
    req.body.subjects.forEach(subjectId => {
      subjectList = [...subjectList, subjectId]
    })

  if (req.body.grades)
    req.body.grades.forEach(gradeId => {
      gradeList = [...gradeList, gradeId]
    })

  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    surname: req.body.surname,
    index: req.body.index,
    password: req.body.password,
    email: req.body.email,
    isStudent: req.body.isStudent,
    $push: {subjects: subjectList, grades: gradeList},
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