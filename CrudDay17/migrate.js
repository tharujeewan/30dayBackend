// migrate.js
require('dotenv').config({ path: '../.env' }); // load env correctly
const { pool } = require('./config/db');

const runMigration = async () => {
  try {
    console.log('🚀 Migration started');

    // 1️⃣ Create users table first
    const usersQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await pool.query(usersQuery);
    console.log('✅ Users table created successfully');

    // 2️⃣ Create reports table after users
    const reportsQuery = `
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100),
        status VARCHAR(50) DEFAULT 'OPEN',
        user_id INT REFERENCES users(id) ON DELETE CASCADE, -- link report to user
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await pool.query(reportsQuery);
    console.log('✅ Reports table created successfully');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    if (pool) {
      await pool.end();
      console.log('🔌 DB connection closed');
    }
  }
};

runMigration();
