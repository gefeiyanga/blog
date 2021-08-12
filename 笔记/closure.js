const MakerCounter = () => {
  let privateCounter = 0;
  const changeBy = (val) => {
    privateCounter += val;
  };
  return {
    increment: () => {
      changeBy(1);
    },
    decrement: () => {
      changeBy(-1);
    },
    value: () => privateCounter,
  };
};

const counter1 = MakerCounter();
const counter2 = MakerCounter();
counter1.increment();
counter1.increment();
counter1.increment();
console.log(counter1.value());
console.log(counter2.value());

class MakerCounterClass {
  static privateCounter = -1;
  privateCounter = 0;
  changeBy = (val) => {
    this.privateCounter += val;
  };
  increment = () => {
    this.changeBy(1);
  };
  decrement = () => {
    this.changeBy(-1);
  };
  value = () => this.privateCounter;
  static value() {
    return this.privateCounter;
  }
}

const counter3 = new MakerCounterClass();
const counter4 = new MakerCounterClass();
counter3.increment();
counter3.increment();
counter3.increment();
console.log(counter3.value());
console.log(counter4.value());
console.log(MakerCounterClass.value());

const arr = new Array(3);
for (var i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
