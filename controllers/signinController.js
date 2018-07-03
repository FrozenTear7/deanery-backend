const User = require('../schemas/user')

exports.postSignin = (req, res) => {
  User.find({email: req.body.email, password: req.body.password}, (err, user) => {
    if (err)
      res.status(500).send(err)
    else
      User.find({}, (err, users) => {
        if (err)
          res.status(500).send(err)
        else if (users.filter(dbUser => dbUser.email === req.body.email
            && dbUser.password === req.body.password).length === 0)
          res.status(500).send({error: 'User not found'})
        else
          res.send(user[0])
      })
  })
}