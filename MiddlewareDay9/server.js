// File: server.js
const express = require("express");
const app = express();
const PORT = 3000;

// -------------------------
// 1️⃣ Logger Middleware
// -------------------------
// Logs every request with timestamp, HTTP method, and URL
function logger(req, res, next) {
    const time = new Date().toISOString();
    console.log(`[LOG] ${time} - ${req.method} ${req.url}`);
    next(); // Pass control to next middleware or route
}

// -------------------------
// 2️⃣ Metrics Middleware
// -------------------------
// Measures response time and logs it
function metrics(req, res, next) {
    const startTime = Date.now(); // Start timer when request comes in

    // 'finish' event triggers when response is sent
    res.on("finish", () => {
        const duration = Date.now() - startTime;
        console.log(`[METRICS] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    });

    next(); // Pass control to next middleware or route
}

// -------------------------
// 3️⃣ Apply Middleware Globally
// -------------------------
app.use(logger);   // Logs request info
app.use(metrics);  // Measures response time

// -------------------------
// 4️⃣ Sample Routes
// -------------------------
app.get("/", (req, res) => {
    res.send("Hello, this is the home page!");
});

app.get("/about", (req, res) => {
    res.send("This is the about page!");
});

// Simulate slow route
app.get("/slow", (req, res) => {
    setTimeout(() => {
        res.send("This route is a bit slow...");
    }, 1500); // 1.5 seconds delay
});

// -------------------------
// 5️⃣ Start Server
// -------------------------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
