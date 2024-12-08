import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const sslCert = fs.readFileSync('./certificates/ca.pem', 'utf8');

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  queueLimit: 10,
  connectionLimit: 5,
  port: Number(process.env.DB_PORT),
  ssl: {
    ca: sslCert,
    rejectUnauthorized: false,
  },
});
