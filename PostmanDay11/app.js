const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Reports array
let reports = [
    { id: 1, location: "ward no:4", issue: "pothole" }
];

// -------------------
// GET all reports
// -------------------
app.get('/reports', (req, res) => {
    res.status(200).json(reports);
});

// -------------------
// CREATE a new report
// -------------------
app.post('/reports', (req, res) => {
    // Validation: make sure body exists and has location + issue
    if (!req.body || !req.body.location || !req.body.issue) {
        return res.status(400).json({
            error: "Request body must contain 'location' and 'issue'"
        });
    }

    const newReport = {
        id: reports.length + 1,
        location: req.body.location,
        issue: req.body.issue
    };

    reports.push(newReport);
    res.status(201).json(newReport);
});

// -------------------
// DELETE a report
// -------------------
app.delete('/reports/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Optional: check if report exists
    const exists = reports.some(r => r.id === id);
    if (!exists) {
        return res.status(404).json({ error: "Report not found" });
    }

    reports = reports.filter(r => r.id !== id);
    res.status(204).send(); // No content
});

// -------------------
// START SERVER
// -------------------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
