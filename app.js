const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const studentController = require('./controllers/studentController')
const teacherController = require('./controllers/teacherController')
const subjectController = require('./controllers/subjectController')
const gradeController = require('./controllers/gradeController')
const signinController = require('./controllers/signinController')

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(cors())
app.use(jsonParser)
app.use(urlencodedParser)

const options = {
  user: 'admin',
  pass: 'admin123',
}

mongoose.connect('mongodb://@ds125241.mlab.com:25241/deanery-example', options)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connection open')
})

let router = express.Router()

router.route('/students')
  .post(signinController.isAuthenticated, studentController.postStudent)
  .get(signinController.isAuthenticated, studentController.getStudents)

router.route('/students/:id')
  .get(signinController.isAuthenticated, studentController.getStudent)
  .put(signinController.isAuthenticated, studentController.editStudent)
  .delete(signinController.isAuthenticated, studentController.deleteStudent)

router.route('/teachers')
  .post(signinController.isAuthenticated, teacherController.postTeacher)
  .get(signinController.isAuthenticated, teacherController.getTeachers)

router.route('/teachers/:id')
  .get(signinController.isAuthenticated, teacherController.getTeacher)
  .put(signinController.isAuthenticated, teacherController.editTeacher)
  .delete(signinController.isAuthenticated, teacherController.deleteTeacher)

router.route('/subjects')
  .post(signinController.isAuthenticated, subjectController.postSubject)
  .get(signinController.isAuthenticated, subjectController.getSubjects)

router.route('/subjects/:id')
  .get(signinController.isAuthenticated, subjectController.getSubject)
  .put(signinController.isAuthenticated, subjectController.editSubject)
  .delete(signinController.isAuthenticated, subjectController.deleteSubject)

router.route('/grades')
  .post(signinController.isAuthenticated, gradeController.postGrade)
  .get(signinController.isAuthenticated, gradeController.getGrades)

router.route('/grades/:id')
  .get(signinController.isAuthenticated, gradeController.getGrade)
  .put(signinController.isAuthenticated, gradeController.editGrade)
  .delete(signinController.isAuthenticated, gradeController.deleteGrade)

router.route('/signin/student')
  .post(signinController.signinStudent)

router.route('/signin/teacher')
  .post(signinController.signinTeacher)

app.use(router)

app.listen(3001, () => {
  console.log('Listening on port 3001')
})