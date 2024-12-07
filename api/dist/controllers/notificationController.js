"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNotification = exports.sendNewNotification = exports.getSentNotifications = exports.getIncommingNotifications = void 0;
const notificationModel_1 = require("../models/notificationModel");
//flow "from" znamená, že chci dostat uživatelem odeslané, flow "to" uživatelem přijaté
const getIncommingNotifications = (req, res) => {
    (0, notificationModel_1.getNotificationsModel)('to_user', req.body.userId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Nepodařilo se získat příchozí upozornění' });
        }
        return res.status(200).json(result);
    });
};
exports.getIncommingNotifications = getIncommingNotifications;
const getSentNotifications = (req, res) => {
    (0, notificationModel_1.getNotificationsModel)('from_user', req.body.userId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Nepodařilo se získat odchozí upozornění' });
        }
        return res.status(200).json(result);
    });
};
exports.getSentNotifications = getSentNotifications;
const sendNewNotification = (req, res) => {
    (0, notificationModel_1.sendNewNotificationModel)(req.body.notification, req.body.userId, (err, result) => {
        if (err) {
            return res.status(500).json(result);
        }
        return res.status(200).json(result);
    });
};
exports.sendNewNotification = sendNewNotification;
const readNotification = (req, res) => {
    (0, notificationModel_1.readNotificationModel)(req.body.id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Nepodařilo se aktualizovat upoznorění' });
        }
        return res.status(200).json(result);
    });
};
exports.readNotification = readNotification;
