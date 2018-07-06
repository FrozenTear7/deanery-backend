const Teacher = require('../schemas/teacher')

exports.postTeacher = (req, res) => {
  const newTeacher = new Teacher(req.body)
  newTeacher.save((err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Teacher created successfully'})
  })
}

exports.getTeachers = (req, res) => {
  Teacher.find({})
    .populate('subjects')
    .exec((err, teachers) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(teachers)
    })
}

exports.getTeacher = (req, res) => {
  Teacher.findById(req.params.id)
    .populate({
      path: 'subjects',
      select: 'name students',
      populate: {
        path: 'students',
        model: 'Student',
        select: 'name surname index grades',
        populate: {
          path: 'grades',
          model: 'Grade',
          select: 'value note subject'
        },
      },
    })
    .exec((err, teacher) => {
      if (err)
        res.status(500).send(err)
      else
        res.send(teacher)
    })
}

exports.editTeacher = (req, res) => {
  let subjectList = []

  if (req.body.subjects)
    req.body.subjects.forEach(subjectId => {
      subjectList = [...subjectList, subjectId]
    })

  Teacher.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    email: req.body.email,
    index: req.body.index,
    avatar: req.body.avatar,
    $push: {subjects: subjectList},
  }, (err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Teacher updated successfully'})
  })
}

exports.deleteTeacher = (req, res) => {
  Teacher.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      res.status(500).send(err)
    else
      res.send({message: 'Teacher removed from the database'})
  })
}