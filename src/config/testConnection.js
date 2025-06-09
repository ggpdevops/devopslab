import pool from './db.js';

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

testConnection();