// @ts-nocheck
var message;
console.log(message); // undefined

// var 声明作用域
function test() {
  var baz = 'hi'; // 局部变量
}
test();
console.log(baz); // ReferenceError: baz is not defined

function test2() {
  baz = 'hi'; // 全局变量
}
test2();
console.log(baz); // hi
// 不推荐在局部作用域中定义全局变量。在严格模式下，如果像这样给未声明的变量赋值，会导致抛出ReferenceError。

// var 声明提升
// 所谓提升（hoist），也就是把所有变量的声明都拉到函数作用域的顶部。
function foo() {
  console.log(age);
  var age = 19;
}
foo(); // undefined
// 相当于
function foo2() {
  var age;
  console.log(age);
  age = 19;
}
foo2(); // undefined
// 这一切都是基于使用了var关键词声明，注意和以下代码区分
function foo3() {
  console.log(age);
  age = 19;
}
foo3(); // ReferenceError: age is not defined

// var 可以反复声明同一个变量
function foo4() {
  var name = 'Lucy';
  var name = 'Jeo';
  var name = 'John';
  console.log(name);
}
foo4(); // John

// let 声明
// let 声明和 var 声明的区别1: let声明的范围是块作用域，而var声明的范围是函数作用域
if (true) {
  var name = 'Matt';
  console.log(name); // Matt
}
console.log(name); // Matt

if (true) {
  let age = 19;
  console.log(age); // age
}
console.log(age); // ReferenceError: age is not defined

// 区别2: let 也不允许同一个块作用中出现冗余声明，而var可以
var name;
var name;

let age;
let age; // SyntaxError: Identifier 'age' has already been declared

// 暂时性死区
// 区别3: let声明的变量不会在作用域中被提升，而var可以
console.log(name); // undefined
var name = 'Petter';

console.log(age); // Uncaught ReferenceError: age is not defined
let age = 19;

// 全局声明
// 区别4: 与var不同，使用let在全局作用域中声明的变量不会成为window对象的属性，而var声明的变量会。（在浏览器中）
var name = 'Mary';
console.log(window.name); // Mary

let age = 20;
console.log(window.age); // undefined

// for循环中的let声明
// 在let出现之前，for循环定义的迭代变量会渗透到循环体的外部
for (var i = 1; i < 5; i++) {}
console.log(i); // 5
// 改用let之后，这个问题就消失了，因为迭代变量的作用域仅限于for循环块内部
for (let i = 1; i < 5; i++) {}
console.log(i); // ReferenceError: i is not defined

// 在使用var时，最常见的问题是对迭代变量的奇特声明和修改
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
// 你可能以为是： 0， 1， 2， 3， 4，
// 而实际上是： 5， 5， 5， 5， 5，
// 之所以会是这样，是因为在退出循环时，迭代变量保存的值是导致循环退出的值 5。
// 在执行之后的超时逻辑时，所有的i都是一个变量。

// 而在使用let声明迭代变量时，js引擎在后台会为每一个迭代循环声明一个新的迭代变量。
// 每个setTimeout引用的都是不同的变量实例，所以输出的是循环执行过程中每个迭代变量的值。
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0, 1, 2, 3, 4
// 这种每次迭代声明一个独立变量实例的行为适用于所有风格的for循环，
// 包括 for-in 和 for-of 循环。

// const 声明
// const 的行为与let 基本相同，唯一一个重要区别是，用const声明变量时必须同时初始化变量
// 且尝试修改const声明的变量会导致运行时错误。
const age = 20;
age = 21; // TypeError: Assignment to constant variable.

// const也不允许重复声明，声明的作用域也是块作用域

// const声明的限制只适用于它指向的变量的引用。
// 换句话说，如果const变量引用的是一个对象，那么修改这个对象内部的属性并不违反const的限制。
const person = {};
person.name = 'Matt'; // ok

// 不能用const声明迭代变量，因为迭代变量会自增
// 不过，可以使用const声明一个不会被修改的for循环变量。
// 也就是说，每个迭代只是创建一个新变量。这对 for-of 和 for-in 循环特别有意义：
let i = 0;
for (const j = 7; i < 5; i++) {
  console.log(j);
}
// 7, 7, 7, 7, 7

for (const key in { a: 1, b: 2 }) {
  console.log(key);
}
// a, b
for (const value of [1, 2, 3, 4, 5]) {
  console.log(value);
}
// 1, 2, 3, 4, 5
