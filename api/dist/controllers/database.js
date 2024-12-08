"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const sslCert = fs_1.default.readFileSync('./certificates/ca.pem', 'utf8');
exports.db = mysql2_1.default.createPool({
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
