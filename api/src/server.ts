import express from 'express';
//import { connectDB,db } from './controllers/database';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import userRouter from './routes/userRoutes';

export const app = express();
const PORT = 5000;
const routesPath = path.join(__dirname, 'routes');
const NODE_ENV = 'production';

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: '*',
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

const fileExtension = NODE_ENV === 'production' ? '.js' : '.ts';

fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(fileExtension)) {
        import(path.join(routesPath, file)).then((module) => {
            console.log(module.default);
            app.use('/api', module.default);
        }).catch(err => {
            console.error(`Chyba při načítání souboru ${file}:`, err);
        });
    }
});

app.use(userRouter);

//connectDB();

app.get('/', (req, res) => {
    console.log('API běží!');
});

app.use('/api', (req, res, next) => {
    console.log(`Přijatý požadavek na: ${req.url}`);
    next();
});


app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server běží na ${PORT}`);
});
