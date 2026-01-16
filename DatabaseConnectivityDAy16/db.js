const {Pool} = require('pg');

// Create a new pool (databse connection)
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

//export pool so that it can be used in other files
module.exports = { pool };