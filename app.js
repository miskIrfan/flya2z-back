var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subscribersRouter = require('./routes/subscribers');
var toursRouter = require('./routes/tours');

var app = express();
const port = 9000;
// add mongoose 
var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/flya2z", {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
  if(error){
      console.log("Error occured not able to connect");
  }
  });


// add cors 
var cors = require('cors');
app.use(cors(
  //{origin:'http://localhost:4200'}
  ));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/front-end/flya2z-front/dist/index.html'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subscribers', subscribersRouter);
app.use('/tours', toursRouter);

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
  res.render('error');
});

//server listening
//app.listen(3005, ()=> console.log("listening on port 3005"));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/front-end/flya2z-front/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(port, () => {

  console.log('server started on port '+port);
});

module.exports = app;