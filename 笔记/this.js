// @ts-nocheck
const obj = {
  a: 1,
  sayA: function () {
    console.log(this.a);
  },
};
const a = 2;
obj.sayA();
const sayA2 = obj.sayA;
sayA2();
