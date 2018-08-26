var fs = require('fs');

//
// //readFileSync
// console.log('A');
// var result = fs.readFileSync('JSsyntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');
//
//readFile

//readFile
console.log('A');
fs.readFile('JSsyntax/sample.txt', 'utf8', function(err, result){
  console.log(result);
});
console.log('C');
