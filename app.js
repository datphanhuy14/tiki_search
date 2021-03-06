var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let nunjucks = require('nunjucks')
let passport = require('passport');
var session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
const db = require('./db');
const exToJson = require('./excel_book')
const axiosTiki = require('./axios')

// LOAD DATA API AND FILE EXCEL

db.sequelize.sync().then(async ()=>{

    await db.user.findOrCreate({
        where: {
            username: 'admin'
        },
        defaults: {
            username: 'admin',
            password: "admin"
        }
    })
    axiosTiki.testAxios().then(() => {
        console.log("Load successfully");
    })
    // exToJson();
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('view engine', 'html');
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
require('./passport')(passport);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    })
)
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('err',{err : err.message});
});

module.exports = app;
