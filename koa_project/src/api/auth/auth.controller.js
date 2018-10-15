const Joi = require('joi');
const Account = require('models/account');

//로컬 회원가입
exports.localRegister = async (ctx) => {
    
    //데이터 검증
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const result = Joi.validate(ctx.request.body, schema);
    
    //스키마 검증 실패
    if(result.error) {
        ctx.status = 400;
        return;
    }

    //아이디/이메일 중복처리 구현
    let existing = null;

    try {
        existing = await Account.findByEmailOrUsername(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    // console.log(existing);
    
    //중복되는 아이디/이메일이 있을 경우
    if(existing){
        ctx.status = 409;
        //어떤 값이 중복되었는지 알려줌
        ctx.body = {
            //existing.email === ctx.request.body.email가 True면 email 값을 보여주고 아니면 username을 보여줌
            key: existing.email === ctx.request.body.email ? 'email' : 'username'
        };
        return;
    }


    //계정 생성
    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = account.profile;
};

//로컬 로그인
exports.localLogin = async (ctx) => {
    
    //데이터 검증
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error){
        console.log('데이터 검증 오류');
        ctx.status = 400;
        return;
    }

    const { email, password } = ctx.request.body;
    
    let account = null;

    //이메일로 계정 찾기
    try {
        
        account = await Account.findByEmail(email);
    } catch (e) {
        console.log('이메일 없음');
        ctx.throw(500, e);
    }

    const a = await Account.validatePassword(password);
    console.log(a);
    
    // //유저가 존재하지않거나 비밀번호가 일치하지 않음
    // if(!account || ! await Account.validatePassword(password)) {
    //     console.log('유저가 존재하지않거나 비밀번호 일치하지 않음');
    //     ctx.status = 403; 
    //     return;
    // }
    ctx.body = account.profile;
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async (ctx) => {
    ctx.body = 'exists';
};

//로그아웃
exports.logout = async (ctx) => {
    ctx.body = 'logout';
};