var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');

// Importa paquetes con middlewares
//Middleware: Función JavaScript que se ejecuta al llegar una transacción HTTP.

var routes = require('./routes/index');
//var users = require('./routes/users');
//dice que hay que borrar la línea de arriba.
// Importa paquetes con middlewares de enrutadores

var app = express();
//Crear aplicación

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
//Instalar generador de vistas EJS

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
//Instalar los middlewares importados.

app.use('/', routes);
//app.use('/users', users);
//Dice que hay que borrar la línea de arriba.
//Instalar los middlewares enrutadores importados
//Asociar rutas a sus gestores.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//Resto de rutas: genera error 404 de HTTP.

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
	    errors: []
        });
    });
}
//Gestión de errores durante el desarrollo

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
	errors: []
    });
});


module.exports = app;
//Exportar app para comando de arranque
