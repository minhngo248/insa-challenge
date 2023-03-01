var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playersRouter = require('./routes/playersRouter');
var playerRouter = require('./routes/playerRouter');
var cureRoomRouter = require('./routes/cureRoomRouter');
var adminRouter = require('./routes/adminRouter');

var app = express();

require("dotenv").config();
// Config of MongoDB connection
/*mongoose.set('strictQuery', false);
mongoose.connect(
  "mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + "insa-game" + "?ssl=true&replicaSet=globaldb",
  {
    auth: {
      username: process.env.COSMOSDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
  })
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.error('Error connection to DB: ' + err)); */

mongoose.set('strictQuery', false);
mongoose.connect(
  "mongodb://127.0.0.1:27017/insa-game",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Connection to MongoDB successful'))
  .catch((err) => console.error('Error connection to DB: ' + err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/players', playersRouter);
app.use('/api/player', playerRouter);
app.use('/api/rooms', cureRoomRouter);
app.use('/api/admin', adminRouter);

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
