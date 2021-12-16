function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperProperty = function () {
  return this.property;
};

function SubType() {
  this.subProperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubProperty = function () {
  return this.subProperty;
};
