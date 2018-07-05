const Student = require('../schemas/student')
const Teacher = require('../schemas/teacher')

exports.postSigninStudent = (req, res) => {
  Student.find({index: req.body.index, password: req.body.password}, (err, user) => {
    if (err)
      res.status(500).send(err)
    else
      Student.find({}, (err, users) => {
        if (err)
          res.status(500).send(err)
        else if (users.filter(dbUser => dbUser.index === req.body.index
            && dbUser.password === req.body.password).length === 0)
          res.status(500).send({error: 'User not found'})
        else
          res.send(user[0])
      })
  })
}

exports.postSigninTeacher = (req, res) => {
  Teacher.find({index: req.body.index, password: req.body.password}, (err, user) => {
    if (err)
      res.status(500).send(err)
    else
      Teacher.find({}, (err, users) => {
        if (err)
          res.status(500).send(err)
        else if (users.filter(dbUser => dbUser.index === req.body.index
            && dbUser.password === req.body.password).length === 0)
          res.status(500).send({error: 'User not found'})
        else
          res.send(user[0])
      })
  })
}