import express from 'express';
import multer from 'multer';
import { getUsers,createNewUser, loginUser, editUser, changePassword, uploadUserImage, checkEmail, checkUser, checkNick, getUser, forgotPassword } from '../controllers/userController';

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
        }
    }
}

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage(),
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
      } else {
        cb(new Error('Nepovolený typ souboru. Povolené typy: JPEG,JPG, PNG, BMP, WebP, SVG.'));
      }
    },
  });


router.get('/users', getUsers);
router.post('/newUser', createNewUser);
router.post('/login', loginUser);
router.post('/editUser',editUser);
router.post('/changePassword',changePassword);
router.post('/forgotPassword',forgotPassword);
router.post('/checkEmail', checkEmail);
router.post('/checkNick',checkNick);
router.post('/checkUser',checkUser);
router.post('/getUser',getUser);
router.post('/:id/upload-image', upload.single('image'), uploadUserImage);

export default router;