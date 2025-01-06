import express from 'express';
import multer from 'multer';
import { getUsers,createNewUser, loginUser, editUser, changePassword, uploadUserImage, checkEmail, checkUser, checkNick, getUser, resetPassword } from '../controllers/userController';

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
        }
    }
}

const userRouter = express.Router();


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


userRouter.get('/users', getUsers);
userRouter.post('/newUser', createNewUser);
userRouter.post('/login', loginUser);
userRouter.post('/editUser',editUser);
userRouter.post('/changePassword',changePassword);
userRouter.post('/resetPassword',resetPassword);
userRouter.post('/checkEmail', checkEmail);
userRouter.post('/checkNick',checkNick);
userRouter.post('/checkUser',checkUser);
userRouter.post('/getUser',getUser);
userRouter.post('/:id/upload-image', upload.single('image'), uploadUserImage);

export default userRouter;