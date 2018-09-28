var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.count = 1;
    res.send('Hi Session' + req.session.count);
});

router.get('/tmp', function(req, res){
    res.send(req.session.count);
});

module.exports = router;


    

    

