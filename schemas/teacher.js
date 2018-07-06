const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Subject = require('../schemas/subject')

const teacherSchema = mongoose.Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  index: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  avatar: String,
  subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
})

teacherSchema.pre('save', function (callback) {
  let user = this

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback()

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err)

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return callback(err)
      user.password = hash
      callback()
    })
  })
})

teacherSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher