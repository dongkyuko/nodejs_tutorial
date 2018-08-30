app.post('/auth/login_process', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
    
    console.log(info);

    if (info) { // info로 들어온 플래시 메세지 처리
    req.session.flash.error = [info.message];
    } else {
        req.session.flash.success = ['Welcome.'];
    }

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