"use strict";

var m = 567;

function def(m) {
  if (m < 0 || m > 999) {
    console.log("Invalid argument!");
    return null;
  } else {
    this.ed = m % 10;
    m = ~~(m / 10);
    this.des = m % 10;
    m = ~~(m / 10);
    this.sot = m % 10;
  }
}

console.log(new def(m));