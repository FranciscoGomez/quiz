var express = require('express');
var router = express.Router();

var quizController = require ('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('../views/index.ejs', { title: 'Quiz' });

//res.render('index', { title: 'Quiz' });
});

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

router.param('quizId', quizController.load); // autoload : quizId


//Definición de rutas de /quizes
router.get('/quizes/',					quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer);
router.get('/quizes/author', 				quizController.author);

//author se toca en los siguientes archivos:
// /routes/index.js
// /controllers/quiz_controller.js
// /views/quizes/author.ejs
// /public/images/ardilla.jpeg


//router.get('/quizes',				quizController.index);
//router.get('/quizes/:quizId(\\d+)',		quizController.show);
//router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

module.exports = router;
