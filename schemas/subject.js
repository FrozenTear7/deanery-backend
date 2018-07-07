const mongoose = require('mongoose')
const Teacher = require('./teacher')
const Student = require('./student')

const subjectSchema = mongoose.Schema({
  name: {type: String, required: true},
  teachers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'}],
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject