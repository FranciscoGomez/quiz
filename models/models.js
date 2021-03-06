//Archivo: models/models.js

var path= require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
//var sequelize = new Sequelize(null, null, null,
//		{dialect: "sqlite", storage: "quiz.sqlite"}
//		);

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

//Importar la definción de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz;	//exportar definción de tabla Quiz


// Importar definición de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var comment = sequelize.import(comment_path);

comment.belongsTo(Quiz);
Quiz.hasMany(comment);

exports.Quiz = Quiz; //exportar tabla Quiz
exports.comment = comment;


//sequelize.sync()	crea e inicializa tablad e preguntas en BD
sequelize.sync().then(function(){
	// success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count) {
	if(count === 0) {	//la tabla se inicializa solo si está vacía
	   Quiz.create({ pregunta: 'Capital de Italia',
			 respuesta: 'Roma',
			 tema: 'humanidades'
			});
	   Quiz.create({ pregunta: 'Capital de Portugal',
			 respuesta: 'Lisboa',
			tema: 'otro'
			})
	.then(function(){console.log('Base de datos inicializada')});
	};
      });
    }); 
//La tabla quiz tiene los siguientes campos:
//	id
//	pregunta
//	respuesta


