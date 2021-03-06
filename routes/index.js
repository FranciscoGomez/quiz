var express = require('express');
var router = express.Router();

var quizController =    require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

/* GET home page. */
//Esta función le pasa la variable title a ../views/index.ejs
router.get('/', function(req, res) {
  res.render('../views/index.ejs', { title: 'Quiz', errors: []});

//res.render('index', { title: 'Quiz' }); // es lo mismo que la de arriba.
});

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

router.param('quizId', 					quizController.load); 		// autoload : quizId
router.param('commentId', 				commentController.load); 	//autoload: commentId

//Definición de rutas de sesión
router.get('/login', 					sessionController.new); 	//formulario login
router.post('/login',					sessionController.create);	//crear sesión
router.get('/logout',					sessionController.destroy),	//destruir sesión

//Definición de rutas de /quizes
//Preguntas
router.get('/quizes',					quizController.index);
//llama al archivo: /views/quizes/index.ejs

router.get('/quizes/:quizId(\\d+)',			quizController.show);
//llama al archivo: /views/quizes/show.ejs

router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer);
//llama al archivo: /views/quizes/answer.ejs

router.get('/quizes/author', 				quizController.author);
//llama al archivo: /vies/quizes/author.ejs

router.get('/quizes/new',				sessionController.loginRequired, quizController.new);
router.post('/quizes/create',				sessionController.loginRequired, quizController.create);

router.get('/quizes/:quizId(\\d+)/edit',		sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',			sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', 			sessionController.loginRequired, quizController.destroy);

//Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

//author se toca en los siguientes archivos:
// /routes/index.js
// /controllers/quiz_controller.js
// /views/quizes/author.ejs
// /public/images/ardilla.jpeg


//router.get('/quizes',				quizController.index);
//router.get('/quizes/:quizId(\\d+)',		quizController.show);
//router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

module.exports = router;
