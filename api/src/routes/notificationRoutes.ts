import express from 'express';
import { getIncommingNotifications, getSentNotifications, readNotification, sendNewNotification } from '../controllers/notificationController';

const notificationRouter = express.Router();

notificationRouter.post('/getIncommingNotifications',getIncommingNotifications);
notificationRouter.post('/getSentNotifications', getSentNotifications);
notificationRouter.post('/readNotification',readNotification);
notificationRouter.post('/sendNewNotification',sendNewNotification);

export default notificationRouter;