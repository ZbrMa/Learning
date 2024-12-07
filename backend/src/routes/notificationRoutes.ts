import express from 'express';
import { getIncommingNotifications, getSentNotifications, readNotification, sendNewNotification } from '../controllers/notificationController';

const router = express.Router();

router.post('/getIncommingNotifications',getIncommingNotifications);
router.post('/getSentNotifications', getSentNotifications);
router.post('/readNotification',readNotification);
router.post('/sendNewNotification',sendNewNotification);

export default router;