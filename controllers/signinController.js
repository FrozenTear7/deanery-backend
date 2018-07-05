const jwt = require('jsonwebtoken')
const Student = require('../schemas/student')
const Teacher = require('../schemas/teacher')

const secretKey = 'DeanerySecretKey'

// exports.postSigninStudent = (req, res) => {
//   Student.find({index: req.body.index, password: req.body.password}, (err, user) => {
//     if (err)
//       res.status(500).send(err)
//     else
//       Student.find({}, (err, users) => {
//         if (err)
//           res.status(500).send(err)
//         else if (users.filter(dbUser => dbUser.index === req.body.index
//             && dbUser.password === req.body.password).length === 0)
//           res.status(500).send({error: 'User not found'})
//         else
//           res.send(user[0])
//       })
//   })
// }
//
// exports.postSigninTeacher = (req, res) => {
//   Teacher.find({index: req.body.index, password: req.body.password}, (err, user) => {
//     if (err)
//       res.status(500).send(err)
//     else
//       Teacher.find({}, (err, users) => {
//         if (err)
//           res.status(500).send(err)
//         else if (users.filter(dbUser => dbUser.index === req.body.index
//             && dbUser.password === req.body.password).length === 0)
//           res.status(500).send({error: 'User not found'})
//         else
//           res.send(user[0])
//       })
//   })
// }

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(500).send({error: 'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      error: 'No token provided.'
    })
  }
}

exports.signinStudent = (req, res) => {
  const index = req.body.index
  const password = req.body.password

  Student.findOne({index: index}, (err, user) => {
    if (err) {
      return res.status(500).send(err)
    }

    if (!user) {
      return res.status(500).send({error: 'No such user exists'})
    }

    user.verifyPassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err)
      }

      if (!isMatch) {
        return res.status(500).send({error: 'Wrong password'})
      }

      return res.send({
        message: '',
        id: user._id,
        token: jwt.sign({id: user._id}, secretKey),
        name: user.name + ' ' + user.surname
      })
    })
  })
}

exports.signinTeacher = (req, res) => {
  const index = req.body.index
  const password = req.body.password

  Teacher.findOne({index: index}, (err, user) => {
    if (err) {
      return res.status(500).send(err)
    }

    if (!user) {
      return res.status(500).send({error: 'No such user exists'})
    }

    user.verifyPassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err)
      }

      if (!isMatch) {
        return res.status(500).send({error: 'Wrong password'})
      }

      return res.send({
        message: '',
        id: user._id,
        token: jwt.sign({id: user._id}, secretKey),
        name: user.name + ' ' + user.surname
      })
    })
  })
}

