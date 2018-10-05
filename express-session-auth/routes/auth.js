var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var shortid = require('shortid');
var bcrypt = require('bcrypt');

//lowDB 사용
var db =require('../lib/db');

module.exports = function(passport){

  router.get('/login', function(request, response){

    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
    `, '');
    response.send(html);
  });
  
  router.post('/login_process', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
    
    // if (info) { // info로 들어온 플래시 메세지 처리
    //   req.session.flash.error = [info.message];
    // } 
    // else {
    //   req.session.flash.success = ['Welcome.'];
    // }
  
    if (err) {
        return next(err);
    }
    
    // user에 정보가 안들어 왔을 경우
    if (!user) { 
        return req.session.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/auth/login');
        })
    }
  
    // (아마) 첫번재 인자를 serializeUser로 넘기고 콜백으로 그 이후 처리를 작성
    req.logIn(user, function (err) { 
        if (err) {
            return next(err);
        }
        return req.session.save(function (err) {
            
        if (err) {
                return next(err);
        }
            return res.redirect('/');
        });
    });
    })(req, res, next);
    });
  
    router.get('/register', function(request, response){

      var title = 'WEB - Register';
      var list = template.list(request.list);
      var html = template.HTML(title, list, `
        <form action="/auth/register_process" method="post">
          <p><input type="text" name="email" placeholder="email" value="blackdark13@naver.com"></p>
          <p><input type="password" name="pwd" placeholder="password" value="1234"></p>
          <p><input type="password" name="pwd2" placeholder="password" value="1234"></p>
          <p><input type="text" name="displayname" placeholder="display name" value="dongkyu"></p>
          <p>
            <input type="submit" value="register">
          </p>
        </form>
      `, '');
      response.send(html);
    });

  router.post('/register_process', function(request, response){

    var post = request.body;
    var email = post.email;
    var password = post.pwd;
    var password2 = post.pwd2;
    var displayName = post.displayname;
        
    // fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    //   response.redirect(`/topic/${title}`);
    // });

    if (password !== password2){
      return response.redirect('/auth/register');
    } 
    
    else {

      bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        var user = {
          id:shortid.generate(),
          email:email,
          password:hash,
          displayname:displayName,
        }
        db.get('users').push(user).write();
  
        request.logIn(user, function (err) {
          if (err) {
              return err;
          }
          request.session.save(function(err1){
            if(err1){
              return err1;
            }
            return response.redirect(`/`);
            })
          })
      });
    }
  });

  router.get('/logout', function(request, response){
    request.logout();
    //request.session.destory();
    request.session.save(function(){
      request.session.destroy(function(){
        //request.session;
        response.redirect('/');
      })
    });
  });

  return router;
};