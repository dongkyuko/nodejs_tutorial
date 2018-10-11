require('dotenv').config(); // .env 파일에서 환경변수 불러오기

const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();
const api = require('./api');

const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser');

mongoose.Promise = global.Promise; //Node의 네이티브 Promise 사용
// mongodb 연결
mongoose.connect(process.env.MONGO_URI, {
    // useMongoClient: true
}).then(
    (response) => {
        console.log('Successfully connected to mongodb');
        
    }
).catch ( e => {
    console.log(e);
})

const port = process.env.PORT || 5000;

app.use(bodyParser()); // 바디파서 적용 라우터 적용코드보다 상단에 있어야함

router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());;

app.listen(port, () => {
    console.log("Kora server is listening to port 4000");
    
});