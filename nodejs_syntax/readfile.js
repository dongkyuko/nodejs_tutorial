var testFloder = './data';
var fs = require('fs');

fs.readdir(testFloder, function(error, filelist) {
  console.log(filelist);
});
