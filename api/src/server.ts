import express from 'express';
import path from 'path';
import multer from 'multer';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import filterRouter from './routes/filterRoutes';
import notificationRouter from './routes/notificationRoutes';
import placeRouter from './routes/placeRoutes';
import eventRouter from './routes/eventRoutes';

export const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization',"Language"],
  }));
  

//app.options('*', cors());

export const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

app.use(userRouter);
app.use(filterRouter);
app.use(notificationRouter);
app.use(placeRouter);
app.use(eventRouter);

app.get('/', (req, res) => {
    console.log('API běží!');
});

app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server běží na ${PORT}`);
});
