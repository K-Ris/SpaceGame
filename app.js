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
var crewDataHandlerRouter = require('./routes/crew_datahandler');
var updateHandlerRouter = require('./routes/updatehandler');
var questCrewHandlerRouter = require('./routes/crew_questhandler');
var questManagerRouter = require('./routes/crew_questmanager');
var questHandlerRouter = require('./routes/questhandler');

var loginTerminalRouter = require('./routes/terminal/t_login');
var statusTerminalRouter = require('./routes/terminal/t_status');
var uploadAskTerminalRouter = require('./routes/terminal/t_uploadAsk');
var uploadQuestionTerminalRouter = require('./routes/terminal/t_uploadQuestion');
var debugLoginTerminalRouter = require('./routes/terminal/t_debuglogin');

var questImporterToolsRouter = require('./routes/tools/tool_questimporter');
var questImporterHandlerRouter = require('./routes/tools/tool_questimporterhandler');



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
app.use('/crew_datahandler', crewDataHandlerRouter);
app.use('/updatehandler', updateHandlerRouter);
app.use('/crew_questhandler', questCrewHandlerRouter);
app.use('/crew_questmanager', questManagerRouter);
app.use('/questhandler', questHandlerRouter);


app.use('/terminal/login', loginTerminalRouter);
app.use('/terminal/status', statusTerminalRouter);
app.use('/terminal/uploadAsk', uploadAskTerminalRouter);
app.use('/terminal/uploadQuestion', uploadQuestionTerminalRouter);
app.use('/terminal/debugLogin', debugLoginTerminalRouter);

app.use('/tools/questimporter', questImporterToolsRouter);
app.use('/tools/questimporthandler', questImporterHandlerRouter);



app.use('/fonts', express.static('./public/fonts'));



module.exports = app;
