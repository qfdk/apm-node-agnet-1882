const apm = require('elastic-apm-node').start({
  serviceName: process.env.APM_SERVICE_NAME,
  active: true,
  captureSpanStackTraces: false,
  breakdownMetrics: false,
  logLevel: 'trace'
});
const { knex } = require('./knex-config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// test query sample
const queryTest = () => {
  return knex.raw(`
      SELECT 1+1
    `);
}

app.get('/test-query', async (req, res, next) => {
  const result = await queryTest();
  res.json(result)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
