const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const userController = require('./controllers/userController')
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

router.route('/users')
  .post(userController.postUser)
  .get(userController.getUsers)

router.route('/users/:id')
  .get(userController.getUser)
  .put(userController.editUser)
  .delete(userController.deleteUser)

router.route('/subjects')
  .post(subjectController.postSubject)
  .get(subjectController.getSubjects)

router.route('/subjects/:id')
  .get(subjectController.getSubject)
  .put(subjectController.editSubject)
  .delete(subjectController.deleteSubject)

router.route('/grades')
  .post(gradeController.postGrade)
  .get(gradeController.getGrades)

router.route('/grades/:id')
  .get(gradeController.getGrade)
  .put(gradeController.editGrade)
  .delete(gradeController.deleteGrade)

router.route('/signin')
  .post(signinController.postSignin)

app.use(router)

app.listen(3001, () => {
  console.log('Listening on port 3001')
})