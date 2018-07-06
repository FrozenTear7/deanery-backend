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
    .populate({path: 'teachers', select: 'name surname index'})
    .populate({path: 'students', select: 'name surname index'})
    .exec((err, subjects) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(subjects)
    })
}

exports.getSubject = (req, res) => {
  Subject.findById(req.params.id)
    .populate({path: 'teachers', select: 'name surname index'})
    .populate({path: 'students', select: 'name surname index'})
    .exec((err, subject) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(subject)
    })
}

exports.editSubject = (req, res) => {
  let teacherListAdd = []
  let studentListAdd = []
  let teacherListDelete = []
  let studentListDelete = []

  if (req.body.teacherListAdd)
    teacherListAdd = req.body.teacherListAdd.map(user => user._id)
  if (req.body.studentListAdd)
    studentListAdd = req.body.studentListAdd.map(user => user._id)
  if (req.body.teacherListDelete)
    teacherListDelete = req.body.teacherListDelete.map(user => user._id)
  if (req.body.studentListDelete)
    studentListDelete = req.body.studentListDelete.map(user => user._id)

  console.log(req.body)

  Subject.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    $push: {teachers: teacherListAdd, students: studentListAdd}
  }, (err, subject) => {
    if (err)
      res.status(500).send(err)
    else {
      teacherListAdd.forEach(teacher => {
        Teacher.findByIdAndUpdate(teacher, {
          $push: {subjects: subject._id},
        }, (err) => {
          if (err)
            res.status(500).send(err)
        })
      })

      studentListAdd.forEach(student => {
        Student.findByIdAndUpdate(student, {
          $push: {subjects: subject._id},
        }, (err) => {
          if (err)
            res.status(500).send(err)
        })
      })

      Subject.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        $pull: {teachers: {$in: teacherListDelete}, students: {$in: studentListDelete}},
      }, (err, subject) => {
        if (err)
          res.status(500).send(err)
        else {
          teacherListDelete.forEach(teacher => {
            Teacher.findByIdAndUpdate(teacher, {
              $pull: {subjects: subject._id},
            }, (err) => {
              if (err)
                res.status(500).send(err)
            })
          })

          studentListDelete.forEach(student => {
            Student.findByIdAndUpdate(student, {
              $pull: {subjects: subject._id},
            }, (err) => {
              if (err)
                res.status(500).send(err)
            })
          })

          res.send({message: 'Subject successfully edited'})
        }
      })
    }
  })
}

exports.deleteSubject = (req, res) => {
  Subject.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      res.status(500).send(err)
    else {
      Student.findByIdAndUpdate(req.body.student, {
        $pull: {subjects: req.params.id},
      }, (err) => {
        if (err)
          res.status(500).send(err)
      })

      Teacher.findByIdAndUpdate(req.body.student, {
        $pull: {subjects: req.params.id},
      }, (err) => {
        if (err)
          res.status(500).send(err)
      })

      res.send({message: 'Subject removed from the database'})
    }
  })
}