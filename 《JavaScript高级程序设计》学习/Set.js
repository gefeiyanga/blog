// 数组去重
const arr = [1, 2, 1, 3, 4, 5];
const s = new Set();
arr.map((item) => s.add(item));
console.log([...s]);
console.log([...new Set(arr)]);

const arr2 = [{ a: 1 }, { a: 1 }, { b: 1 }];
console.log([...new Set(arr2)]);
const a = { a: 2 };

const arr3 = [a, a, { b: 1 }];
console.log([...new Set(arr3)]);

const arr4 = [{ a: 1 }, { a: 1 }, { b: 1 }];
const s2 = new Set();
arr4.map((item) => s2.add(JSON.stringify(item)));
console.log([...s2]);
const arr4Unique = [...s2].map((item) => JSON.parse(item));
console.log(arr4Unique);

const arr5 = [
  {
    name: 'ZYTX',
    age: 'Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix',
    gender: 'AAAAAA.doc',
  },
  {
    name: 'ZYTA',
    age: 'Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix',
    gender: 'BBBBBB.doc',
  },
  {
    name: 'ZDTX',
    age: 'Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix',
    gender: 'CCCCCC.doc',
  },
  {
    gender: 'AAAAAA.doc',
    name: 'ZYTX',
    age: 'Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix',
  },
];
const obj2 = {};
const arr5Unique = arr5.reduce((prev, cur) => {
  obj2[cur.name] ? null : (obj2[cur.name] = true && prev.push(cur));
  return prev;
}, []);
console.log(arr5Unique);

const s3 = new Set([1, 2, 3]);
console.log(s3);
// add(), has(), delete(), clear(), size
console.log(s3.add(3)); // 添加某个值，返回 Set 结构本身。
console.log(s3.add(4));

console.log(s3.delete(0)); // 删除某个值，返回一个布尔值，表示删除是否成功。
console.log(s3.delete(4));

console.log(s3.has(3)); // 返回一个布尔值，表示该值是否为Set的成员。
console.log(s3.has(4));

console.log(s3.clear()); // 清除所有成员，没有返回值。

console.log(s3.size);

// keys(), values(), entries(), forEach()
const s4 = new Set(['red', 'green', 'blue']);
console.log(s4.keys());
for (const iterator of s4.keys()) {
  console.log(iterator);
}
for (const iterator of s4.values()) {
  console.log(iterator);
}

for (const iterator of s4.entries()) {
  console.log(iterator);
}

// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);
// true

// 这意味着，可以省略values方法，直接用for...of循环遍历 Set。
for (const iterator of s4) {
  console.log(iterator);
}

s4.forEach((value, key) => console.log(`${key}: ${value}`));

// WeakSet
// 它与 Set 有两个区别, WeakSet 的成员只能是对象，而不能是其他类型的值。
// 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
