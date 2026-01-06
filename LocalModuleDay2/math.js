// math.js

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return "cannot divide by 0 "
    return a / b;
};

// We export an object containing our functions
module.exports = {
    add,
    subtract,
    multiply,
    divide
};