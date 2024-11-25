import express from 'express';
import { getUsers,createNewUser, loginUser, editUser, changePassword, uploadUserImage, checkEmail, checkUser, checkNick, getUser } from '../controllers/userController';

const router = express.Router();

router.get('/users', getUsers);
router.post('/newUser', createNewUser);
router.post('/login', loginUser);
router.post('/editUser',editUser);
router.post('/changePassword',changePassword);
router.post('/changeUserImage',uploadUserImage);
router.post('/checkEmail', checkEmail);
router.post('/checkNick',checkNick);
router.post('/checkUser',checkUser);
router.post('/getUser',getUser);

export default router;