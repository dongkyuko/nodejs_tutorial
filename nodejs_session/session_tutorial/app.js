const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countRouter = require('./routes/count');

const app = express();

app.use(session({
  secret: '12321fdsjkfjdsklfjsdklfjsdflkjsdl1@#$#@$',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/counts', countRouter);


app.get('/count', function(req, res){
  if(req.session.count){
    req.session.count ++;
  } else {
    req.session.count = 1;
  }
  res.send('count: ' + req.session.count);
});

app.get('/tmp', function(req, res){
  // res.send(req.session.count);
  res.send('count_tmp: ' + req.session.count);
});

app.get('/auth/login', function(req, res){
  // res.send(req.session.count);
  const output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p><input type="text" name="username" placeholder="username"></p>
    <p><input type="password" name="password" placeholder="password"></p>
    <p><input type="submit"></p>
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', function(req, res){
  // res.send(req.session.count);

  const user = {
    username: "kodongkyu",
    password: '1234',
    displayName: "Dongkyu"
  };

  const username = req.body.username;
  const password = req.body.password;

  if( username === user.username && password === user.password){
    req.session.displayName = user.displayName;
    res.redirect("/welcome");
  } else {
    res.send(`Who are you? <p><a href="/auth/login">Login</a></p>`);
  }
});

app.get('/welcome', (req,res) => 
  {
    if(req.session.displayName){
      res.send(`<h1>Hello, ${req.session.displayName}</h1>
      <p><a href="/auth/logout">Logout</a></p>`);
    } else {
      res.send(`<h1>Welcome</h1>
      <p><a href="/auth/login">Login</a></p>
      `);
    }
  }
);

app.get('/auth/logout', (req, res) => {
  req.session.destroy(err => res.send(err));
  res.redirect('/welcome')
});
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

module.exports = app;
