// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// const a = getRandomInt(100001, 999999);

// console.log(a);
  

//오늘 날짜 구하는 JavaScript
const date = new Date();
 
const year = date.getFullYear(); //년도
const month = date.getMonth()+1; //월
let day = date.getDate(); //일

if ((day+"").length < 2) { // 일이 한자리 수인 경우 앞에 0을 붙여주기 위해
    day = "0" + day;
}

const getToday = year+"-"+month+"-"+day; // 오늘 날짜 (2017-02-07)

console.log(getToday);
