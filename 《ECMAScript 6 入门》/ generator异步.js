// @ts-nocheck
const fetch = require('node-fetch');

const gen = function* (url) {
  const result = yield fetch(url);
  return result;
};
const g = gen('https://api.github.com/users/github');
const result = g.next();
// result.value
//   .then((res) => g.next(res).value.json())
//   .then((val) => console.log(val));
result.value.then((res) => res.json()).then((res) => console.log(g.next(res)));
// result.value
//   .then((data) => data.json())
//   .then(function (data) {
//     console.log(g.next(data));
//   });

// thunk 函数
// ES5版本
const Thunk = function (fn) {
  return function () {
    const args = Array.prototype.slice(arguments);
    return function (callback) {
      args.push(callback);
      return fn.call(this, callback);
    };
  };
};

// ES6版本
const Thunk2 = function (fn) {
  console.log('this1: ', this);
  return function (...args) {
    console.log('this2: ', this);
    return function (callback) {
      console.log('this3: ', this);
      return fn.call({}, ...args, callback);
    };
  };
};
const bigObj = {
  Thunk2,
};
const obj = {
  a: 1,
  b: 2,
  add: function (x, y, callback) {
    console.log(this);
    callback(x, y);
  },
};
function callback(x, y) {
  console.log(this);
  console.log(x + y);
}
bigObj.Thunk2(obj.add)(3, 4)(callback);
const obj = {
  a: 1,
  b: 2,
  add: () => {
    console.log(this);
  },
};
obj.add();
