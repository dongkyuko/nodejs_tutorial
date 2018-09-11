var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '111111';
const someOtherPlaintextPassword = '111111';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result){
        console.log(result);
    })

  });

