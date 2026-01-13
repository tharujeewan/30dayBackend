const express = require('express');
const app = express();
const { reportSchema } = require('./validators/report.validator');
const validate = require('./middlewares/validate');

app.use(express.json());

// Use validation middleware
app.post('/reports', validate(reportSchema), (req, res) => {
  // If we are here, validation passed
  res.status(201).json({
    message: "Validation passed!",
    data: req.body
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(3000, () => console.log('Validator active on port 3000'));
