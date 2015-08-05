//Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
	  'Quiz',
		{ pregunta: {
		type: DataTypes.STRING,
		validate: {notEmpty: {msg: "Falta Pregunta"}}
		//validate: { NotContains: 'Pregunta', notEmpty : {msg: "-> Falta Pregunta" }}
		//validate: { notEmpty: {msg: "Falta Pregunta"}, NotContains: { args: [["Pregunta"]], msg: "Pregunta"}}
		},
		  respuesta: {
		type: DataTypes.STRING,
		validate: {notEmpty: {msg: "Falta Respuesta"}}
		//validate: { notEmpty : {msg: "-> Falta Respuesta"}, NotContrains: {args: [["Respuesta"]], msg: "Respuesta"}}
		//validate: { notEmpty: , NotContains: "Respuesta" {msg: "Respuesta"}}
		}
		}
		);
}
