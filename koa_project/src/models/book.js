const mongoose = require('mongoose');
const { Schema } = mongoose;

// Book에서 사용할 서브다큐먼트의 스키마입니다.
const Author = new Schema({
    name: String,
    email: String
});

const Book = new Schema({
    title: String,
    authors: [Author], //위에서 만든 Author 스키마를 가진 객체들의 배열형태로 설정
    publishedDate: Date,
    price: Number,
    tags: [String],
    created: { // 기본값을 설정할땐 이렇게 객체로 설정
        type: Date,
        default: Date.now
    }
});

//스키마를 모델로 변화여 내보내기 합니다.
module.exports = mongoose.model('Book', Book);