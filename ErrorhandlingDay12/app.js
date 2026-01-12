require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// -------- ROUTES --------

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/error', (req, res, next) => {
  const err = new Error('something went wrong!');
  err.status = 500;
  next(err); // 👈 VERY IMPORTANT
});

// -------- 404 HANDLER --------
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// -------- ERROR HANDLER (MUST BE LAST) --------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// -------- SERVER --------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
