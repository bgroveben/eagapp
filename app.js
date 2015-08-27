var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


/* For more info on routing, go to http://expressjs.com/guide/routing.html */
/* The following code illustrates some example routes in an app. 

// respond with "Hello World!" on the homepage:
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Serving files, such as images, CSS, JavaScript, and other static files is accomplished with built-in middleware in Express: 
express.static
// For example, if you keep your images, CSS, and JavaScript files in a directory named 'public', you can do this:
app.use(express.static('public'));

// If you want to use multiple directories as static asset directories, you can call the express.static middleware multiple times:
app.use(express.static('public'));
app.use(express.static('files'));
// The files will be looked up in the order the static directories were set using the express.static middleware.

// If you want to create a "virtual" (since the path does not actually exist in the system) path prefix for the files served
// by express.static, you can specify a mount path (http://expressjs.com/4x/api.html#app.use) for the static directory:
app.use('/static', express.static('public'));

*/

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
