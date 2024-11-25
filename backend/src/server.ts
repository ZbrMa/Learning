import express from 'express';
//import { connectDB,db } from './controllers/database';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import cors from 'cors';

export const app = express();
const PORT = 5000;
const routesPath = path.join(__dirname, 'routes');

app.use(express.json());

app.use('/uploads/users', express.static(path.join(__dirname, 'users')));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.options('*', cors());

export const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.ts')) {
        import(path.join(routesPath, file)).then((module) => {
            app.use('/api', module.default);
        }).catch(err => {
            console.error(`Chyba při načítání souboru ${file}:`, err);
        });
    }
});

//connectDB();

app.get('/', (req, res) => {
    console.log('API běží!');
});

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
