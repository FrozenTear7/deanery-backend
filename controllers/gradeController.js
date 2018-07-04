const Grade = require('../schemas/grade')

exports.postGrade = (req, res) => {
  const newGrade = new Grade(req.body)
  newGrade.save((err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(newGrade)
  })
}

exports.getGrades = (req, res) => {
  Grade.find({})
    .populate('subject')
    .populate('student')
    .exec((err, grades) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(grades)
    })
}

exports.getGrade = (req, res) => {
  Grade.findById(req.params.id, (err, grade) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(grade)
  })
}

exports.editGrade = (req, res) => {
  Grade.findByIdAndUpdate(req.params.id, {
    value: req.body.value,
    subject: req.body.subject,
    student: req.body.student
  }, (err, grade) => {
    if (err)
      res.status(500).send(err)
    else
      res.send(grade)
  })
}

exports.deleteGrade = (req, res) => {
  Grade.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send('Grade removed from the database')
  })
}