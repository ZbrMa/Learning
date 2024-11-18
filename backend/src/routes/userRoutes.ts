import express from 'express';
import { getUsers,createNewUser, loginUser, editUser, changePassword, uploadUserImage, checkEmail } from '../controllers/userController';

const router = express.Router();

router.get('/users', getUsers);
router.post('/newUser', createNewUser);
router.post('/login', loginUser);
router.post('/editUser',editUser);
router.post('/changePassword',changePassword);
router.post('/changeUserImage',uploadUserImage);
router.post('/checkEmail', checkEmail);

export default router;