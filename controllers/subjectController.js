const Subject = require('../schemas/subject')
const Teacher = require('../schemas/teacher')
const Student = require('../schemas/student')

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
    .populate('students')
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
  let teacherList = []
  let studentList = []

  if (req.body.teachers)
    req.body.teachers.forEach(teacherId => {
      teacherList = [...teacherList, teacherId]
    })

  if (req.body.students)
    req.body.students.forEach(studentId => {
      studentList = [...studentList, studentId]
    })

  Subject.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    $push: {teachers: teacherList, students: studentList},
  }, (err, subject) => {
    if (err)
      res.status(500).send(err)
    else {
      if (req.body.teachers)
        req.body.teachers.forEach(teacherId => {
          Teacher.findByIdAndUpdate(teacherId, {
            $push: {subjects: subject._id},
          }, (err) => {
            if (err)
              res.status(500).send(err)
          })
        })

      if (req.body.students)
        req.body.students.forEach(studentId => {
          Student.findByIdAndUpdate(studentId, {
            $push: {subjects: subject._id},
          }, (err) => {
            if (err)
              res.status(500).send(err)
          })
        })
    }

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