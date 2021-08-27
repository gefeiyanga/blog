// @ts-nocheck
const arr = [1, 2, 3, 4, 5];
const result = arr.reduce((prev, cur, index, array) => {
  console.log(prev, cur, index, array);
  return prev + cur;
});
console.log(result);
