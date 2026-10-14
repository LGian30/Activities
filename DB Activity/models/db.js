require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection().then((connection)=>{
  console.log("DB connection established");
  connection.release();
}).catch ((er)=>{
  console.error("DB connection failed: ", er.message);
  process.exit(1);
});

module.exports = pool;