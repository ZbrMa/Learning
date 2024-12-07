"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStorage = exports.app = void 0;
const express_1 = __importDefault(require("express"));
//import { connectDB,db } from './controllers/database';
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const PORT = 5000;
const routesPath = path_1.default.join(__dirname, 'routes');
exports.app.use(express_1.default.json());
exports.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
exports.app.options('*', (0, cors_1.default)());
exports.userStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
fs_1.default.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.ts')) {
        Promise.resolve(`${path_1.default.join(routesPath, file)}`).then(s => __importStar(require(s))).then((module) => {
            exports.app.use('/api', module.default);
        }).catch(err => {
            console.error(`Chyba při načítání souboru ${file}:`, err);
        });
    }
});
//connectDB();
exports.app.get('/', (req, res) => {
    console.log('API běží!');
});
exports.app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
