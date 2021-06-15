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
