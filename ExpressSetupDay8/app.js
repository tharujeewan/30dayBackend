const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Mock database (replace with PostgreSQL later)
const reports = [
    { id: 1, issue: "street light out", status: "pending", city: "kathmandu" },
    { id: 2, issue: "water pipe burst", status: "resolved", city: "kathmandu" },
    { id: 3, issue: "road damage", status: "pending", city: "pokhara" },
    { id: 4, issue: "garbage overflow", status: "pending", city: "lalitpur" }
];

// ===================== ROUTES =====================

// Health check / Home
app.get("/", (req, res) => {
    res.json({
        message: "LocalCare API is running 🚀"
    });
});

// ABOUT
app.get("/about", (req, res) => {
    res.json({
        app: "LocalCare",
        version: "1.0.0",
        description: "Civic issue reporting backend"
    });
});

// ===================== SEARCH & FILTER =====================
// REAL-WORLD SEARCH API
// Example:
// /reports?city=kathmandu
// /reports?issue=water
// /reports?city=kathmandu&issue=water&status=pending

app.get("/reports", (req, res) => {
    const { city, issue, status } = req.query;

    let filteredReports = reports;

    if (city) {
        filteredReports = filteredReports.filter(
            r => r.city.toLowerCase() === city.toLowerCase()
        );
    }

    if (issue) {
        filteredReports = filteredReports.filter(
            r => r.issue.toLowerCase().includes(issue.toLowerCase())
        );
    }

    if (status) {
        filteredReports = filteredReports.filter(
            r => r.status.toLowerCase() === status.toLowerCase()
        );
    }

    res.json({
        total: filteredReports.length,
        filters: {
            city: city || "any",
            issue: issue || "any",
            status: status || "any"
        },
        results: filteredReports
    });
});

// ===================== GET REPORT BY ID =====================
app.get("/reports/:id", (req, res) => {
    const reportId = parseInt(req.params.id);

    if (isNaN(reportId)) {
        return res.status(400).json({ error: "Invalid report ID" });
    }

    const report = reports.find(r => r.id === reportId);

    if (!report) {
        return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
});

// ===================== 404 HANDLER =====================
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

// ===================== SERVER =====================
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
