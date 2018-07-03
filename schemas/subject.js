const mongoose = require('mongoose')
const User = require('../schemas/user')

const subjectSchema = mongoose.Schema({
  name: {type: String, required: true},
  teachers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject