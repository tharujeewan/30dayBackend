// app.js

// 1. Import a Core Module (built into Node)
const path = require('path');

// 2. Import your Local Module (notice the './')
const math = require('./math');

const num1 = 10;
const num2 = 5;

// Use the imported functions
console.log(`Addition: ${math.add(num1, num2)}`);
console.log(`Subtraction: ${math.subtract(num1, num2)}`);
console.log(`Multiplication: ${math.multiply(num1, num2)}`);
console.log(`Division: ${math.divide(num1, num2)}`);

// Use the path module to see where this file lives
const fileLocation = path.join(__dirname, 'app.js');
console.log(`The full path of this file is: ${fileLocation}`);