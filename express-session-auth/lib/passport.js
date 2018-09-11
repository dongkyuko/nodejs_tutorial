var db =require('../lib/db');
var bcrypt = require('bcrypt');

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
        done(null, user.id);
    });

    //'/' URL이 아닌 다른 URL에 접속했을때 데이터를 가져감, 세션에 있는 데이터를 가져옴
    // id 값은 serializeUser에서 넘겨준 값 (user.email)
    passport.deserializeUser(function(id, done) {
        var user = db.get('users').find({id:id}).value();
        done(null, user);
    });

    //로그인 성공/실패 판별
    passport.use(new LocalStrategy(
    //로그인 폼 name 수정
    {
        usernameField: 'email',
        passwordField: 'pwd',
    },

    function(email, password, done) {
        
        var user = db.get('users').find({email:email}).value();
        
        if (user) {
            bcrypt.compare(password, user.password, function(err, result){
                
                console.log(result);
                
                if(result){
                    return done(null, user);
                }

                else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        } 
        
        else {
            return done(null, false, { message: 'Incorrect email.' });
        }
        
    }
    ));

    return passport;
};