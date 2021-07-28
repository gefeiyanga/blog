// @ts-nocheck
var cat = {
  name: '喵喵',
  eatFish: function (param1, param2) {
    console.log('吃鱼');
    console.log('this的指向=>');
    console.log(this);
    console.log(param1, param2);
  },
};
var dog = {
  name: '汪汪',
  eatBone: function (param1, param2) {
    console.log('啃骨头');
    console.log('this的指向=>');
    console.log(this);
    console.log(param1, param2);
  },
};

cat.eatFish.call(dog, '旺财', 'call');
dog.eatBone.apply(cat, ['86', 'apply']);

var a = 10;
const fnn = () => console.log(a);
function fn(x, y, z) {
  console.log(x, y, z, this.a);
}
fn.call(undefined, ...[1, 2, 3]);
var obj = {
  a: 11,
};
fn.call(obj, ...[1, 2, 3]);

fnn.call();
fnn.call(obj);

function Fo1() {
  this.age = 16;
  this.name = 'Fo1';
}

const fnnnn = function (gender) {
  console.log(this.age + ' ' + this.name + gender);
};
Fo1.prototype.toString = fnnnn;
const fo1 = new Fo1();
fo1.toString('male');

function Fo2() {
  this.age = 13;
  this.name = 'Fo2';
}
fo1.toString.call(new Fo2(), 'famale');
// new Fo2().toString();
Fo2.prototype.toString = Fo1.prototype.toString;
new Fo2().toString('male');

function print() {
  console.log('我是print函数');
  console.log(this.x, this.y);
}
var obj2 = {
  x: 12,
  y: 13,
};
print.call(obj2);
obj2.__proto__.print = print;
obj2.print();

// 手写call apply bind

Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const symbol = Symbol();
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
};
Function.prototype.myApply = function (context, args) {
  context = context || window;
  const symbol = Symbol();
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
};
Function.prototype.myBind = function (context) {
  context = context || window;
  const self = this;
  const args = [...arguments].slice(1);
  return function () {
    return self.apply(context, [...args, ...arguments]);
  };
};

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.myBind(this, name)(price);

  // Product.bind(this, name)(price);
  // Product.myApply(this, [name, price]);
  // Product.myCall(this, name, price);
  // Product.call(this, name, price);
  this.category = 'food';
}
const food = new Food('cheese', 3215);
console.log(food);

// this
function Person() {
  // Person() 构造函数定义 `this`作为它自己的实例.
  this.age = 0;

  console.log(this.age);
  this.to = setTimeout(this.growUp.bind(this, this.to), 1000);
}

Person.prototype.growUp = function (to) {
  // 在非严格模式, growUp()函数定义 `this`作为全局对象,
  // 与在 Person()构造函数中定义的 `this`并不相同.
  console.log(++this.age);
  clearTimeout(to);
};

var p = new Person();
