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

class Parent {
  static fn() {
    console.log('parent fn');
  }
}
class Child extends Parent {
  static fn() {
    console.log('child fn');
    super.fn();
  }
}
Child.fn();

// 私有属性
class Widget {
  // 公有方法
  foo(baz) {
    this._bar(baz);
  }
  // 私有方法
  _bar(baz) {
    console.log(baz);
    return (this.snaf = baz);
  }
}
const div = new Widget();
div.foo(11);
div._bar(12);

class Point {}

class ColorPoint extends Point {
  constructor() {
    // super();
  }
}

const cp = new ColorPoint();
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
// 上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错。

// ES5的继承，实质是先创造子类的的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this）
// ES6的继承机制完全不同，实质是先将父类实例对象的属性和方法加到this上面（所以必须先调用super方法），
// 然后再用子类的构造函数修改this
class ColorPoint extends Point {}
// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}

// 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则报错
// 这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    console.log(`${this.x}, ${this.y}`);
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    // this.color = color; // ReferenceError
    super(x, y);
    this.color = color;
  }
}
let cp = new ColorPoint(25, 8, 'green');
console.log(cp instanceof Point); // true
console.log(cp instanceof ColorPoint); // true
cp.toString();
// Object.getPrototypeOf方法可以用来从子类上获取父类。
console.log(Object.getPrototypeOf(cp)); // Point {}
console.log(Object.getPrototypeOf(ColorPoint) === Point); // true
console.log(Object.getPrototypeOf(cp) === ColorPoint.prototype); // true
console.log(Object.getPrototypeOf(cp) === cp.__proto__); // true
console.log(cp.__proto__ === ColorPoint.prototype); // true
console.log(cp.constructor === ColorPoint.prototype.constructor); // true
console.log(cp.constructor === ColorPoint); // true
console.log(ColorPoint == ColorPoint.prototype.constructor); // true

// super关键字
// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它们用法完全不同

// 第一种情况，super作为函数调用时，代表父类构造函数。ES6要求，子类的构造函数必须执行一次super函数
class A {}
class B extends A {
  constructor() {
    super();
  }
}
// 上面代码中，子类B的构造函数中的super(),代表调用父类的构造函数。这是必须的
// 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this,
// 指向的是B的实例，因此super()在这里相当于
// A.prototype.constructor.call(this)
class A {
  constructor() {
    console.log(new.target.name); // new.targer指向当前正在执行的函数
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A(); // A
new B(); // B

// 作为函数时，super()只能用在子类的构造函数中

// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象
// 在静态方法中，指向父类
class A {
  p() {
    return '2';
  }
  static p() {
    return '3';
  }
}
class B extends A {
  constructor() {
    super();
    console.log(super.p());
  }
  static p() {
    console.log(super.p());
  }
}
new B(); // '2'
B.p(); // '3'

// 上面代码中，子类B当中的super.p(),就是将super当作一个对象使用。
// 这时，super在普通方法中，指向A.prototype，所以super.p()相当于A.prototype.p
// 这里需要注意的是，由于super指向父类的原型对象，所以定义在父类实例上的
// 方法和属性，是无法通过super调用的

class A {
  constructor() {
    this.p = 2;
  }
}
class B extends A {
  get m() {
    return super.p;
  }
}
const b = new B();
console.log(b.m); // undefined
// 上面代码中，p是父类A实例的属性，super.p就引用不到它

// 如果属性定义在父类的原型对象上，super就可以取到
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x);
  }
}
new B();
// 上面代码中，属性x是定义在A.prototype上面的，所以super.x可以取到它的值

// ES6规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}
const b = new B();
b.m();
// 上面代码中，super.print()虽然调用的是A.prototype.print(),
// 但是A.prototype.print()内部的this指向子类的B的实例，导致输出的是2
// 也就是说实际上执行的是super.print.call(this)

// 由于this指向子类的实例，所以如果通过super对某个属性赋值，
// 这时super就是this，赋值的属性就会变成子类实例的属性
class A {
  constructor() {
    this.x = 1;
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}
new B();
// 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3
// 而当读取super.x的时候，读的是A.prototype.x，所以返回undefined
