var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv').config(); 

var peixeRouter = require('./routes/peixe');
var loginRouter = require('./routes/login');
var estacaoRouter = require('./routes/estacao');
var NPCRouter = require('./routes/npc');
var CompRouter = require('./routes/competicao');
var SwaggerUI = require('swagger-ui-express');
var SwaggerFile = require('./swagger_doc.json');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/peixe', peixeRouter);
app.use('/login', loginRouter);
app.use('/estacao', estacaoRouter);
app.use('/npc', NPCRouter);
app.use('/comp', CompRouter);
app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerFile));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({mensagem: 'Um erro desconhecido ocorreu'});
});

module.exports = app;