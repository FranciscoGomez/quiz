//Archivo: router/index.ejs

var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quiz_controller.js');

/* GET home page. */
//Esta función le pasa la variable title a ../views/index.ejs
router.get('/', function(req, res) {
  res.render('../views/index.ejs', { title: 'Quiz', errors: []});

//res.render('index', { title: 'Quiz' }); // es lo mismo que la de arriba.
});

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

router.param('quizId', quizController.load); // autoload : quizId


//Definición de rutas de /quizes
router.get('/quizes/',					quizController.index);
//llama al archivo: /views/quizes/index.ejs

router.get('/quizes/:quizId(\\d+)',			quizController.show);
//llama al archivo: /views/quizes/show.ejs

router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer);
//llama al archivo: /views/quizes/answer.ejs

router.get('/quizes/author', 				quizController.author);
//llama al archivo: /vies/quizes/author.ejs

router.get('/quizes/new',				quizController.new);
router.post('/quizes/create',				quizController.create);

router.get('/quizes/:quizId(\\d+)/edit',		quizController.edit);
router.put('/quizes/:quizId(\\d+)',			quizController.update);

//author se toca en los siguientes archivos:
// /routes/index.js
// /controllers/quiz_controller.js
// /views/quizes/author.ejs
// /public/images/ardilla.jpeg


//router.get('/quizes',				quizController.index);
//router.get('/quizes/:quizId(\\d+)',		quizController.show);
//router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

module.exports = router;
