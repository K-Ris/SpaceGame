var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var crewLoginRouter = require('./routes/crew_login');
var userLoginRouter = require('./routes/user_login');
var userStatsRouter = require('./routes/user_stats');
var userLogRouter = require('./routes/user_log');
var crewMainRouter = require('./routes/crew_main');
var crewSelectRouter = require('./routes/crew_select');
var loginhandlerRouter = require('./routes/loginhandler');
var crewDataHandler = require('./routes/crew_datahandler');
var updateHandler = require('./routes/updatehandler');
var questHandler = require('./routes/crew_questhandler');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/crew_login', crewLoginRouter);
app.use('/user_login', userLoginRouter);
app.use('/user_stats', userStatsRouter);
app.use('/user_log', userLogRouter);
app.use('/crew_main', crewMainRouter);
app.use('/crew_select', crewSelectRouter);
app.use('/loginhandler', loginhandlerRouter);
app.use('/crew_datahandler', crewDataHandler);
app.use('/updatehandler', updateHandler);
app.use('/crew_questhandler', questHandler);



module.exports = app;
