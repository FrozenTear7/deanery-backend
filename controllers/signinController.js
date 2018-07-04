const User = require('../schemas/user')

exports.postSignin = (req, res) => {
  User.find({index: req.body.index, password: req.body.password}, (err, user) => {
    if (err)
      res.status(500).send(err)
    else
      User.find({}, (err, users) => {
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