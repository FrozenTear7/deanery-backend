const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  index: String,
  isStudent: Boolean
})

const User = mongoose.model('User', userSchema)

module.exports = User