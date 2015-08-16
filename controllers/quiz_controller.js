var models = require('../models/models.js');

//campos de la tabla quiz:
//id
//pregunta
//respuesta

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find({
		where: {id: Number(quizId) },
		include: [{ model: models.comment}]
		}).then(function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
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
//Realiza la consulta de preguntas y responde llamando al archivo: '/views/quizes/index.ejs con la variables: quizes
//que es una tabla donde se cumple los criterios de búsquedas.
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
			res.render('quizes/index',{quizes: quizes, errors:[]});
		}
	).catch(function(error){next(error);})	
};

//GET /quizes/:id
//Muestra todas las preguntas.
//Lo que hace es llamar al archivo: show.ejs, y le pasa como argumento req.quiz, es decir, la tabla de preguntas.

exports.show = function(req, res) {
	  res.render ('quizes/show.ejs', { quiz: req.quiz, errors:[]});
};

//GET /quizes/:id/answer
//Si lo que introduces desde teclado es lo mismo que lo que hay en la tabla de preguntas, Entonces llama al archivo: quizes/answer
// con las siguientes variables:
// Tabla de preguntas: req.quiz
// Variable: respuesta: 'Correcto' o 'Incorrecto'
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
	resultado = 'Correcto';
	}
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: []});
	};

//GET /quizes/authors
//llama al archivo quizes/author.ejs con la variable: autor: 'Francisco ...'
exports.author = function(req, res) {
	res.render ('quizes/author.ejs', { autor: 'Francisco Javier Gomez Alba', errors: []});
};

//GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta: "Pregunta", respuesta:"Respuesta", tema: "Otro"}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};


//POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then(
		function(err) {
			if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
			console.log("quiz/new");
			} else {
				//Guarda en BBDD los campos preguntas y respuesta de quiz
			quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then( function(){ res.redirect('/quizes?search=');});
			console.log("exports create quiz.save");
				} //res.redirect: Redirección HTTP a lista de preguntas
			      }
			    );
};

//Guarda en BD los campos preguntas y respuesta de quiz. Práctica 8.1.
//quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
//	res.redirect('/quizes');
//	})	//Redirección HTTP (URL relativo) lista de preguntas
//};

//GET /quizes:/:id/edit
exports.edit = function(req, res) {
	var quiz= req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz.validate().then(
		function(err){
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				//Guardamos en BBDD los campos preguntas y respuesta de quiz.
		  req.quiz.save( {fields: ["pregunta", "respuesta", "tema"]}).then( function() { res.redirect('/quizes?search=');});
		  console.log("exports.update  quiz.save");
				} 	//redirección HTTP a lista de preguntas (URL relativo)
			     }
			);
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes?search=');
	}).catch(function(error){next(error)});

};


//GET /quizes/question
//Para la práctica 7 no se utiliza esta función.
//Atención: no se utiliza el archivo: /views/quizes/question.ejs
exports.question = function (req, res) {
	models.Quiz.findAll().then(function(quiz) {
	res.render('quizes/question',{pregunta: quiz[0].pregunta, errors: []});
	})
};
