var MutableFunction = require('./index.js');

function testFunc(a, b) {
    return a + b;
}

var mTestFunction = new MutableFunction(testFunc);

console.log(mTestFunction.name);
console.log(mTestFunction.args);

console.log(mTestFunction.apply({}, [1, 2]));
