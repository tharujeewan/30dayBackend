// Import Worker class from Node.js worker_threads module
// This allows us to create a separate thread
const { Worker } = require("worker_threads");

// This runs immediately on the main thread
console.log("1 Main: Start"); //1

// Normal synchronous function running on main thread
function syncTask() {
    console.log(" Main: Sync Task running"); //2
}
syncTask();

// ✅ New function to run after 5 seconds
setTimeout(() => {
    console.log(" Main: Function executed after 5 seconds");
}, 5000); // 5000ms = 5 seconds //8

// This timer will execute when event loop gets control
setTimeout(() => {
    console.log(" Main: setTimeout executed (0ms timer)");
}, 0); //4

// Create a new worker thread
// This loads and runs worker.js in a separate thread
const worker = new Worker("./worker.js");

// Listen for messages sent from the worker thread
worker.on("message", (msg) => {
    console.log(" Main: Worker message received:", msg);
});  //7

// This proves main.js does NOT wait for worker
console.log(" Main: End of main file"); //3
