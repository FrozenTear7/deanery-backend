const Grade = require('../schemas/grade')
const Student = require('../schemas/student')

exports.postGrade = (req, res) => {
  const newGrade = new Grade(req.body)
  newGrade.save((err) => {
    if (err)
      res.status(500).send(err)
    else
      Student.findByIdAndUpdate(req.body.student, {
        $push: {grades: newGrade._id},
      }, (err, student) => {
        if (err)
          res.status(500).send(err)
        else
          res.send({message: 'Grade added successfully'})
      })
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
      Student.findByIdAndUpdate(req.body.student, {
        $pull: {grades: req.params.id},
      }, (err, student) => {
        if (err)
          res.status(500).send(err)
        else
          res.send({message: 'Grade removed from the database'})
      })
  })
}