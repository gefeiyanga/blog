// @ts-nocheck
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3'],
]);
console.log(m);

console.log(m.entries());
// [Map Entries] {
//   [ 'key1', 'val1' ],
//   [ 'key2', 'val2' ],
//   [ 'key3', 'val3' ]
// }
console.log(m.entries === m[Symbol.iterator]);

for (const i of m) {
  console.log(i);
}
for (const j of m.entries()) {
  console.log(j);
}

for (const [key, val] of m) {
  console.log(key, val);
}

m.forEach((val, key) => {
  console.log(val, key);
});

for (const key of m.keys()) {
  console.log(key);
}
for (const value of m.values()) {
  console.log(value);
}
console.log(m.keys(), m.values());

const obj = {
  key1: 'val1',
  key2: 'val2',
  key3: 'val3',
};
console.log(Object.entries(obj)); // [ [ 'key1', 'val1' ], [ 'key2', 'val2' ], [ 'key3', 'val3' ] ]
console.log(Object.keys(obj)); // [ 'key1', 'key2', 'key3' ]

const m1 = new Map([['q', 1]]);
const o = { p: 'hello world' };
m1.set(o, 'content');
console.log(m1.get(o));
// size, has(), set(), get(), delete()
console.log(m1.size);
console.log(m1.has(o));
console.log(m1.set(o, 'content2')); // 添加某个值，返回 Map 结构本身。
console.log(m1.get(o));
console.log(m1.delete(o)); // delete方法删除某个键，返回true。如果删除失败，返回false。
console.log(m1.clear()); // clear方法清除所有成员，没有返回值。

console.log(m1);

// 事实上，不仅仅是数组，任何具有Iterator接口，且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。
// 也就是说，Set和Map都可以用来生成新的Map
const set = new Set([
  ['foo', '1'],
  ['bar', '2'],
]);
// @ts-ignore
const m2 = new Map(set);
console.log(m2.get('bar'));

let map = new Map();

map.set(-0, 123);
console.log(map.get(+0)); // 123

map.set(true, 1);
map.set('true', 2);
console.log(map.get(true)); // 1

map.set(undefined, 3);
map.set(null, 4);
console.log(map.get(undefined)); // 3

map.set(NaN, 123);
console.log(map.get(NaN)); // 123

// Map转对象
const m3 = new Map([
  ['foo', 1],
  ['bar', 2],
]);
const mapToObj = (map) => {
  const obj = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
};
console.log(mapToObj(m3));

// 对象转Map
const obj3 = {
  bar: { value: 2 },
  foo: 1,
};
console.log(Object.entries(obj3));
const map4 = new Map(Object.entries(obj3));
console.log(map4);
map4.get('bar').value = 3;
console.log(map4);

// WeakMap
// WeakMap结构与Map结构类似，也是用于生成键值对的集合。
// WeakMap与Map的区别有两点。
// 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
// 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
