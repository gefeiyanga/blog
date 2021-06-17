// @ts-nocheck
// 构造函数
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return `${this.x}, ${this.y}`;
};
const p = new Point(1, 2);
console.log(p.toString());

console.log(Object.keys(Point.prototype));
// ["toString"]
console.log(Object.getOwnPropertyNames(Point.prototype));
// ["constructor","toString"]
// 上面代码采用 ES5 的写法，toString()方法就是可枚举的。

//类
class Point {
  // 构造方法
  constructor(x, y) {
    // this 关键字代表实例对象
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }
}
const p = new Point(3, 4);
console.log(typeof Point, typeof p); // function object
console.log(Point.prototype.constructor === Point); // true
console.log(p.constructor === Point.prototype.constructor); // true
console.log(p.constructor === Point); // true
// 上面代码表明，类的数据类型就是函数，类本身就指向构造函数。
console.log(Object.keys(Point.prototype)); // 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
console.log(Object.getOwnPropertyNames(Point.prototype)); // [ 'constructor', 'toString' ]

class Foo {
  constructor() {}
}

console.log(new Foo() instanceof Foo); // true

class Foo {
  constructor() {
    return Object.create(null);
  }
}

console.log(new Foo() instanceof Foo); // false

// 与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上）
// 否则都是定义在原型上（即定义在class上）
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }
}

const p = new Point(5, 6);
console.log(p.toString());

console.log(p.hasOwnProperty('x')); // true
console.log(p.hasOwnProperty('y')); // true
console.log(p.hasOwnProperty('toString')); // false
console.log(Point.prototype.hasOwnProperty('toString')); // true
console.log(Point.prototype.toString); // [Function: toString]
console.log(p.__proto__.hasOwnProperty('toString')); // true
// 上面代码中，x和y都是实例对象p自身的属性（因为定义在this对象上），
// 所以 hasOwnProperty()方法返回true。
// 而toString()是原型对象的属性（因为定义在Point类上），
// 所以 hasOwnProperty()方法返回false。
// 这些与ES5一致

// 与ES5一样，类的所有实例共享一个原型对象
const p1 = new Point(7, 8);
const p2 = new Point(9, 10);
console.log(p1.__proto__ === p2.__proto__); // true
console.log(p1.__proto__ === Point.prototype); // true
// 上面代码中，p1和p2都是Point的实例，它们的原型是Point.prototype
// 所以__proto__属性是相等的

// 这也意味着，可以通过实例的__proto__属性为“类”添加方法（但很不推荐）
// 使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。

console.log(Object.getPrototypeOf(p1) === Point.prototype);
// 在生成环境中，我们可以使用Object.getPrototypeOf()方法来获取实例对象的原型，
// 然后再来为原型添加方法/属性

// this的指向
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
// const { printName } = logger;
// printName();  //  TypeError: Cannot read property 'print' of undefined
logger.printName(); // Hello there
// 上面代码中，pointName方法中的this,默认指向Logger类的实例。
// 但是，如果将这个方法提出来单独使用，this会指向该方法运行时所在的环境。
// 由于class内部是严格模式，所以this实际指向的是undefined
// 两种方式解决
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
  // ...
}

class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
console.log(myObj === myObj.getThis()); // true
