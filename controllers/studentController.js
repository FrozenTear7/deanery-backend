const Student = require('../schemas/student')

exports.postStudent = (req, res) => {
  const newStudent = new Student(req.body)
  newStudent.save((err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Student created successfully'})
  })
}

exports.getStudents = (req, res) => {
  Student.find({})
    .populate('subjects')
    .populate('grades')
    .exec((err, students) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(students)
    })
}

exports.getStudent = (req, res) => {
  Student.findById(req.params.id)
    .populate({path: 'subjects', select: 'name teachers', populate: {path: 'teachers', model: 'Teacher', select: 'name surname email'}})
    .populate({path: 'grades', select: 'value', populate: {path: 'subject', model: 'Subject', select: 'name'}})
    .exec((err, student) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(student)
    })
}

exports.editStudent = (req, res) => {
  let subjectList = []
  let gradeList = []

  if (req.body.subjects)
    req.body.subjects.forEach(subjectId => {
      subjectList = [...subjectList, subjectId]
    })

  if (req.body.grades)
    req.body.grades.forEach(gradeId => {
      gradeList = [...gradeList, gradeId]
    })

  Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    surname: req.body.surname,
    index: req.body.index,
    password: req.body.password,
    email: req.body.email,
    $push: {subjects: subjectList, grades: gradeList},
  }, (err, student) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Student updated successfully'})
  })
}

exports.deleteStudent = (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Student removed from the database'})
  })
}