var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId='+quizId));
			}
		}
	).catch(function(error){next(error);})	
};

//Sin búsqueda.
//GET /quizes
//exports.index = function( req, res) {
//	models.Quiz.findAll().then(function(quizes) {
//		res.render('quizes/index.ejs', { quizes: quizes});
//	})
// };

//Con búsqueda.
//GET /quizes
exports.index = function(req, res) {
	console.log(req.query.search);
	
	var search = '%';
	if (req.query.search) {
		search = req.query.search.replace(/ /g, '%');
		search = search.split("+").join("%");
		search = '%'+search+'%';
	}
	models.Quiz.findAll({where: ["pregunta like ?", search], order :"pregunta ASC"}).then(
	//models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index.ejs', { quizes: quizes});
		}
	).catch(function(error){next(error);})	
};

//GET /quizes/:id
exports.show = function(req, res) {
	  res.render ('quizes/show.ejs', { quiz: req.quiz});
};

//GET /quizes/:id/answer
exports.answer = function(req, res) {
	  if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		res.render('quizes/answer',
			{ quiz: req.quiz, respuesta: 'Correcto' });
	} else {
	  res.render ('quizes/answer',
	 		{ quiz: req.quiz, respuesta: 'Incorrecto'});
	}
};

//GET /quizes/authors
exports.author = function(req, res) {
	res.render ('quizes/author.ejs', { autor: 'Francisco Javier Gomez Alba'});
};


//GET /quizes/question
exports.question = function (req, res) {
	models.Quiz.findAll().then(function(quiz) {
	res.render('quizes/question',{pregunta: quiz[0].pregunta});
	})
};
