const mongoose = require('mongoose')
const Subject = require('../schemas/subject')

const teacherSchema = mongoose.Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  index: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher