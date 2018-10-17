// const person = {
//     'name' : 'kodongkyu',
//     'introduce' : () => 'My name is ' + person.name
// }

//console.log(person.introduce());


// function Person (){}

// // 객체를 생성
// const p = new Person();

// //result : Person{}
// console.log(p);

function Person (name){
    // this.name = name;
    this.introduce = () => 'My name is ' + name;
}

// 객체를 생성
const p = new Person('kodongkyu');
console.log(p.introduce());