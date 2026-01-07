// Import parentPort to communicate with the main thread
const { parentPort } = require("worker_threads");

// This log proves worker starts independently
console.log(" Worker: Started heavy work");

// Variable to store result
let sum = 0;

// Heavy synchronous loop
// This loop blocks ONLY the worker thread, not main thread
for (let i = 0; i < 1e9; i++) {
  sum += i;
}

// This log appears AFTER heavy computation is complete
console.log(" Worker: Heavy work done");

// Send the result back to main thread
// This triggers worker.on("message") in main.js
parentPort.postMessage(sum);
