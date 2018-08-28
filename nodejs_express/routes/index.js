var express = require('express');
var router = express.Router();

var fs = require('fs');
var template = require('../lib/template.js');

//메인화면
router.get('/', function (req, res) {
  fs.readdir('./data', function(error, filelist){
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(filelist);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/static/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
      `,
      `<a href="/topic/create">create</a>`
    );
    res.send(html);
  });
});

module.exports = router;
