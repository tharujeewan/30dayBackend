// migrate.js
require('dotenv').config({ path: '../.env' }); // load env correctly

const { pool } = require('./db');

const runMigration = async () => {
  try {
    console.log('🚀 Migration started');

    const query = `
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100),
        status VARCHAR(50) DEFAULT 'OPEN',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await pool.query(query);

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
