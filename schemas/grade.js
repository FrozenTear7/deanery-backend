const mongoose = require('mongoose')
const Subject = require('../schemas/subject')
const User = require('../schemas/user')

const gradeSchema = mongoose.Schema({
  value: {type: Number, required: true},
  subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true},
  student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const Grade = mongoose.model('Grade', gradeSchema)

module.exports = Grade