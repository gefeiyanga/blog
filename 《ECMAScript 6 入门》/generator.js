// @ts-nocheck
function* generatorFn(val) {
  console.log(val);
  return yield;
}

const generatorObject = generatorFn('222');

console.log(generatorObject.next('ooo')); // 222 { value: undefined, done: false }
console.log(generatorObject.next('bar')); // { value: 'bar', done: true }

function* g() {
  yield* [1, 2, 3];
}

for (const i of g()) {
  console.log(i);
}

function* g2() {
  yield 1;
  yield 2;
  return 3;
}

const gObj = g2();

console.log(gObj.next());
console.log(gObj.next());
console.log(gObj.next());
console.log(gObj.next());

function* f() {
  for (var i = 0; true; i++) {
    let reset = yield i;
    console.log(reset);
    if (reset) {
      i = -1;
    }
  }
}

var g = f();

console.log(g.next()); // { value: 0, done: false }
console.log(g.next()); // { value: 1, done: false }
console.log(g.next(true)); // { value: 0, done: false }
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

// Generator.prototype.throw()
const g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获：', e);
  }
};

const i = g();
console.log(i.next());

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获：', e);
}
// { value: undefined, done: false }
// 内部捕获： a
// 外部捕获： b

// throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
var gen = function* gen() {
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
};

var g = gen();
g.next(); // a
g.throw(); // b
g.next(); // c

var gen = function* () {
  yield 1;
  throw new Error('内部错误');
  yield 2;
};
var v;
var g = gen();
v = g.next();
console.log(v);
try {
  console.log('执行了', g.next());
  // v = g.next(); // 同样不会赋值成功
} catch (error) {
  console.log('外部捕捉: ', v);
}

function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());

const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
console.log(gen.next()); // Object {value: 3, done: false}

// console.log(gen.next(1)); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;

// console.log(gen.throw(new Error('出错了')));
console.log(gen.return(2));

for (let i of g(3, 4)) {
  console.log(i);
}

function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
var g = foo();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: 4, done: false }
console.log(g.next()); // { value: 5, done: false }
console.log(g.next()); // { value: 6, done: true }
var f = foo();
for (let i of f) {
  console.log(i);
}
// 1 2 3 4 5
// 上面代码使用for...of循环，依次显示 5 个yield表达式的值。
// 这里需要注意，一旦next方法的返回对象的done属性为true，
// for...of循环就会中止，且不包含该返回对象，
// 所以上面代码的return语句返回的6，不包括在for...of循环之中。

function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}
console.log([...logReturned(genFuncWithReturn())]);

const arr = [1, [2, [3, 4, [5, [6], 7]]], 8, [9, 10]];
function* flat(arr) {
  for (let i of arr) {
    if (Array.isArray(i)) {
      yield* flat(i);
    } else {
      yield i;
    }
  }
}
const f = flat(arr);
for (let i of f) {
  console.log(i);
}

const step1Func = () => console.log('step1');
const step2Func = () => console.log('step2');
const step3Func = () => console.log('step3');

let steps = [step1Func, step2Func, step3Func];

function* iterateSteps(steps) {
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    yield step();
  }
}
let i = iterateSteps(steps);
for (const iterator of i) {
}
