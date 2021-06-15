const buf = new ArrayBuffer(4);
const view = new DataView(buf, 1, 2);
console.log(view);
console.log(buf === view.buffer);
view.setUint8(0, 0x80);
view.setUint8(1, 0x01);
console.log(view);
console.log(buf, view.buffer);
console.log(view.getUint8(0));
