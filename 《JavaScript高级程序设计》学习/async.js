const fs = require('fs');
const path = require('path');

const classFile = path.resolve('《JavaScript高级程序设计》学习', './Class.js');
const mapFile = path.resolve('《JavaScript高级程序设计》学习', './Map.js');

const gen = function* () {
  const f1 = yield readFile(classFile);
  const f2 = yield readFile(mapFile);
  console.log(f1);
  console.log(f2);
};

const g = gen();

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

console.log(g.next());
