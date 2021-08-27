// @ts-nocheck
class A {}
class B extends A {}

console.log(B.__proto__ === A); // true
console.log(B.prototype.__proto__ === A.prototype); // true
// (1)子类的__proto__属性，表示构造函数的继承，总是指向父类
// (2)子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性

// 这样的结果是因为，类的继承是按照下面的模式实现 的
class A {}
class B {}

// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B继承A的实例
Object.setPrototypeOf(B, A);

const b = new B();

// Object.setPrototypeOf 方法的实现：
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

// 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类(A)；
// 作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
