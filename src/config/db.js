import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Travel@123',
  database: 'travel_tech'
});

export default pool;