// @ts-nocheck
const fs = require('fs');
const path = require('path');
var thunkify = require('thunkify');
// var readFileThunk = thunkify(fs.readFile);

// const classFile = path.resolve('《ECMAScript 6 入门》', './a.js');
// const mapFile = path.resolve('《ECMAScript 6 入门》学习', './b.js');

// const gen = function* () {
//   const f1 = yield readFile(classFile);
//   const f2 = yield readFile(mapFile);
//   console.log(f1.toString());
//   console.log(f2.toString());
// };

// const g = gen();

// const readFile = function (fileName) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(fileName, function (error, data) {
//       if (error) return reject(error);
//       g.next(data.toString());

//       // resolve(data);
//     });
//   });
// };
// g.next();

const fileA = path.resolve('《ECMAScript 6 入门》', './a.js');
const fileB = path.resolve('《ECMAScript 6 入门》', './b.js');

const thunkfiy = function (fn) {
  return function () {
    const ctx = this;
    const args = new Array(arguments.length);

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    return function (done) {
      var canI = false;
      args.push(function () {
        if (canI) {
          return;
        }
        canI = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (error) {
        done(error);
      }
    };
  };
};
const readFileThunk = thunkfiy(fs.readFile);

var gen = function* () {
  var r1 = yield readFileThunk(fileA);
  console.log(r1.toString());
  var r2 = yield readFileThunk(fileB);
  console.log(r2.toString());
};

// var g = gen();
// var r1 = g.next();
// r1.value(function (error, data) {
//   if (error) {
//     throw error;
//   }
//   var r2 = g.next(data);
//   r2.value(function (error, data) {
//     if (error) {
//       throw error;
//     }
//     g.next(data);
//   });
// });

function run(fn) {
  var gen = fn();
  var next = function (error, data) {
    var result = gen.next(data);
    // console.log(result.value);
    if (result.done) {
      return;
    }
    if (error) {
      console.log(error);
    }
    result.value(next);
  };
  next();
}

run(gen);
