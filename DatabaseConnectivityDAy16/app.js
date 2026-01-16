//load environment variables from .env file
require('dotenv').config({ path: '../.env' });

const express = require('express');
const { pool } = require('./db');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route to check database connection
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Get current database time
    res.json({
      success: true,
      message: 'Database connected successfully',
      time: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: err.message
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
