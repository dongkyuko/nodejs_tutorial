const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbInfo = require('./lib/db');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countRouter = require('./routes/count');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const app = express();

const sessionStore = new MySQLStore(dbInfo);

app.use(session({
  secret: '12321fdsjkfjdsklfjsdklfjsdflkjsdl1@#$#@$',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
  store: sessionStore
}))

app.use(passport.initialize());
app.use(passport.session());

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

//passport 설정

passport.serializeUser(function(user, done) {
  return done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  return done(null, id);
  // User.findById(id, function(err, user) {
  // });
});

passport.use(new LocalStrategy(
  function(username, password, done) {

    bcrypt.hash('1234', saltRounds, (err, hash) => {
      err => {
        console.log(err);
        return err;
      }
  
      const user = {
        id: 1,
        username: "kodongkyu",
        password: hash, 
        displayName: "Dongkyu"
      };
        
      const username_check = username;
      const password_check = password;
  
      bcrypt.compare(password_check, hash, (err, res_1) => {
        err => {
          console.log(err);
          return err
        };
        if(username_check === user.username) {
          if (res_1) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      });

    });
  }
));

app.post('/auth/login',
  passport.authenticate(
    'local', 
    { 
      successRedirect: '/welcome',
      failureRedirect: '/auth/login',
      failureFlash: false 
    })
);

//URL 설정
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

// app.post('/auth/login', function(req, res){
//   // res.send(req.session.count);

//   bcrypt.hash('1234', saltRounds, (err, hash) => {
//     err => {
//       console.log(err);
//       return err;
//     }

//     const user = {
//       username: "kodongkyu",
//       password: hash, 
//       displayName: "Dongkyu"
//     };

//     const username = req.body.username;
//     const password = req.body.password;

//     bcrypt.compare(password, hash, (err, res_1) => {
//       err => {
//         console.log(err);
//         return err
//       };
//       if(username == user.username) {
//         if (res_1) {
//           req.session.displayName = user.displayName;
//           req.session.save(() => res.redirect("/welcome"));
//         } else {
//           return res.send(`Who are you?(Wrong Password) <p><a href="/auth/login">Login</a></p>`);
//         }
//       } else {
//         return res.send(`Who are you? (Wrong Username) <p><a href="/auth/login">Login</a></p>`);
//       }
//     })
//     // if( username === user.username && password === user.password){
//     //   req.session.displayName = user.displayName;
//     //   req.session.save(() => res.redirect("/welcome"));
//     // } else {
//     //   res.send(`Who are you? <p><a href="/auth/login">Login</a></p>`);
//     // }
//   });
// });

app.get('/welcome', (req,res) => 
  {
    console.log(req.user);
    if(req.user){
      res.send(`<h1>Hello, ${req.user}</h1>
      <p><a href="/auth/logout">Logout</a></p>`);
    } else {
      res.send(`<h1>Welcome</h1>
      <p><a href="/auth/login">Login</a></p>
      `);
    }
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  // req.session.destroy(err => res.send(err));
  // req.session.save(() => res.redirect("/welcome"));
  req.session.save(()=>res.redirect("/welcome"))
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
