const mongoose = require('mongoose')
const Grade = require('../schemas/grade')
const Subject = require('../schemas/subject')

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  index: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  isStudent: {type: Boolean, required: true},
  subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}],
  grades: [{type: mongoose.Schema.Types.ObjectId, ref: 'Grade'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User