// console.log(arguments);

// console.log(require("module").wrapper);

///module.exports

const C = require("./test-module-1");
const calc1 = new C();

console.log(calc1.add(10,27));


// exports

const calc2 = require("./test-module-2");
console.log(calc2.mul(10,5));

// we can also do destructuring 
const {add,mul} = require("./test-module-2");

console.log(add(4,40));
console.log(mul(10,9));
console.log(calc2.sub(30,15));


//caching
require("./test-module-3")(); //loaded only once 
require("./test-module-3")(); // coming from
require("./test-module-3")(); //   cache 