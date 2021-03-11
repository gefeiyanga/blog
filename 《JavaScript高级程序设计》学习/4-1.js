// 参数传递
const setName = (obj) => {
  obj.name = 'Mata';
  obj = new Object();
  obj.name = 'Lucy';
}
const person = new Object();
setName(person);
console.log(person);  // { name: 'Mata' }

// 以上例子证明：即使函数参数为引用值，其传递方式也不是按引用传递，而是按值传递。


// 确定类型
let num = 1;
let numObj = new Number(1);
let arr = [];
let reg = /^d*$/;

console.log(num instanceof Number);  // false
console.log(numObj instanceof Number);  // true

console.log(arr instanceof Array);  // true
console.log(reg instanceof RegExp);  // true
console.log(arr instanceof Object);  // true
console.log(reg instanceof Object);  // true