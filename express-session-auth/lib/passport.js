module.exports = function(app){

    var authData = {
        email:'blackdark13@naver.com',
        //비밀번호 암호화
        password:'1234',
        nickname:'kodongkyu',
      };

    var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

    //passport 미들웨어 사용
    app.use(passport.initialize());
    app.use(passport.session());

    //Session 생성
    //최초 세션 생성 ('/')
    passport.serializeUser(function(user, done) {
    //console.log('serialize:', user);
    done(null, user.email);
    });

    //'/' URL이 아닌 다른 URL에 접속했을때 데이터를 가져감, 세션에 있는 데이터를 가져옴
    passport.deserializeUser(function(id, done) {
    //console.log('id:', id);
    //console.log('authdata:', authData);
    done(null, authData);
    });

    //로그인 성공/실패 판별
    passport.use(new LocalStrategy(
    //로그인 폼 name 수정
    {
        usernameField: 'email',
        passwordField: 'pwd'
    },

    function(username, password, done) {
        if(username === authData.email){
        if(password === authData.password){
            return done(null, authData);
        }
        else {
            return done(null, false, { message: 'Incorrect password.' });
        }
        } else {
        return done(null, false, { message: 'Incorrect username.' });
        }
    }
    ));

    return passport;
};