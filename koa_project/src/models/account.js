const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

const hash = password => crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');

// function hash(password) {
//     return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
// }

const Account = new mongoose.Schema({
    profile: {
        username: String,
        thumbnail: {type: String, default: '/static/images/default_thumbnail.png'}
    },
    email: { type: String },
    //소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id와 accessToken을 저장
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    password: String, //로컬 계정의 경우엔 비밀번호를 해싱해서 저장
    thoughtCount: { type: Number, default:0 }, //서비스에서 포스트를 작성 할 때마다 1씩 올라감
    createdAt: { type: Date, default: Date.now } 
});

//모델 정의
////데이터를 생성할 때는 생성자를 생성해놓고 만들기 
// mongoose.model('콜렉션 이름', 스키마);
//this는 사용하지 않음
let schemaAccount = mongoose.model('schemaAccount', Account);
//methods를 사용하기 위해 정의

// 객체에 내장되어있는 값을 사용할 때 는 객체명.키 이런식으로 쿼리하면 됨
Account.statics.findByUsername = username => schemaAccount.findOne({'profile.username': username}).exec();

Account.statics.findByEmail = email => schemaAccount.findOne({email}).exec();

Account.statics.findByEmailOrUsername = ({username, email}) => schemaAccount.findOne({
    
    // $or 연산자를 통해 둘중에 하나를 만족하는 데이터를 찾습니다
    $or: [
            { 'profile.username': username },
            { email }
        ]
    }).exec();

Account.statics.localRegister = ({ username, email, password }) => {

    const account = new schemaAccount({
        profile: {
            username
            //thumbnail 값을 설정하지 않으면 기본값으로 설정
        },
        email,
        password: hash(password)
    });

    return account.save();
};

// Account.methods.validatePassword = password => {
//     //함수로 전달받은 password 의 해시값과 데이터에 담겨있는 해시값 비교
//     const hashed = hash(password);
//     return hashed;
//     // return schemaAccount.password == hashed;
// };

Account.methods.validatePassword = function(password){
    // console.log('a');
    // //함수로 전달받은 password 의 해시값과 데이터에 담겨있는 해시값 비교
    const hashed = hash(password);
    return schemaAccount.password == hashed;
};

module.exports = mongoose.model('Account', Account);