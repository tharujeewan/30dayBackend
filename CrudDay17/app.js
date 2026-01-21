// Load environment variables from .env file
require('dotenv').config({path: '../.env'});

//import express
const express = require('express')

//import routes
const reportRoutes = require('./routes/report.routes');
const authRoutes = require('./routes/auth.routes');

//create express app
const app = express();



//middleware to parse json body
app.use(express.json());

app.use('/api/auth', authRoutes);

//register routes
app.use('/api/reports', reportRoutes);

//health check 
app.get('/', (req, res) => {
    res.send("Backend is running");
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

