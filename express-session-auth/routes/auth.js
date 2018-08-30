var express = require('express');
var router = express.Router();
var template = require('../lib/template.js')

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
    })
    (req, res, next);
    });

  return router;
};