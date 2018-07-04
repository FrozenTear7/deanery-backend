const Subject = require('../schemas/subject')
const User = require('../schemas/user')

exports.postSubject = (req, res) => {
  const newSubject = new Subject(req.body)
  newSubject.save((err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Subject created successfully'})
  })
}

exports.getSubjects = (req, res) => {
  Subject.find({})
    .populate('teachers')
    .exec((err, subjects) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(subjects)
    })
}

exports.getSubject = (req, res) => {
  Subject.findById(req.params.id, (err, subject) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(subject)
  })
}

exports.editSubject = (req, res) => {
  let teachersList = []

  req.body.teachers.forEach(teacherId => {
    teachersList = [...teachersList, teacherId]
  })

  Subject.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    $push: {teachers: teachersList}
  }, (err, subject) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Subject updated successfully'})
  })
}

exports.deleteSubject = (req, res) => {
  Subject.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Subject removed from the database'})
  })
}