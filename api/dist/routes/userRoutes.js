"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/bmp',
            'image/webp',
            'image/svg+xml'
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Nepovolený typ souboru. Povolené typy: JPEG,JPG, PNG, BMP, WebP, SVG.'));
        }
    },
});
router.get('/users', userController_1.getUsers);
router.post('/newUser', userController_1.createNewUser);
router.post('/login', userController_1.loginUser);
router.post('/editUser', userController_1.editUser);
router.post('/changePassword', userController_1.changePassword);
router.post('/forgotPassword', userController_1.forgotPassword);
router.post('/checkEmail', userController_1.checkEmail);
router.post('/checkNick', userController_1.checkNick);
router.post('/checkUser', userController_1.checkUser);
router.post('/getUser', userController_1.getUser);
router.post('/:id/upload-image', upload.single('image'), userController_1.uploadUserImage);
exports.default = router;
