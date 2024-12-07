import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const sslCert = process.env.SSL_CERTIFICATE;

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
