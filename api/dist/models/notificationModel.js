"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNotificationModel = exports.sendNewNotificationModel = exports.getNotificationsModel = void 0;
const database_1 = require("../controllers/database");
const getNotificationsModel = (flow, userId, callback) => {
    const sql = `SELECT 
                    n.id, 
                    n.subject, 
                    n.content, 
                    n.day, 
                    n.time,
                    n.read_at as readAt, 
                    CASE 
                        WHEN n.from_user = 2 THEN 'Všichni'
                        ELSE u.nick
                    END as from_user,  
                    CASE
                        WHEN n.to_user = 2 THEN 'Všichni'
                        ELSE u2.nick 
                    END as to_user
                FROM notifications n
                LEFT JOIN users u ON n.from_user = u.id 
                LEFT JOIN users u2 ON n.to_user = u2.id 
                WHERE n.${flow} = ? ${userId !== 1 && flow === 'to_user' ? " OR n.to_user = 0 " : ""}
                ORDER BY CONCAT(n.day, ' ', n.time) DESC`;
    database_1.db.query(sql, userId, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        ;
        return callback(null, res);
    });
};
exports.getNotificationsModel = getNotificationsModel;
const sendNewNotificationModel = (notification, userId, callback) => {
    const sql = `INSERT INTO notifications (subject,content,from_user,to_user,day,time) VALUES (?,?,?,?,CURDATE(),CURRENT_TIME())`;
    const params = [notification.subject, notification.content, userId, notification.to];
    database_1.db.query(sql, params, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err, { success: false, message: 'Zprávu se nepodařilo odeslat.' });
        }
        return callback(null, { success: true, message: 'Zpráva byla odeslána' });
    });
};
exports.sendNewNotificationModel = sendNewNotificationModel;
const readNotificationModel = (id, callback) => {
    const sql = `UPDATE notifications SET read_at = ? WHERE id = ?`;
    database_1.db.query(sql, [new Date(), id], (err, res) => {
        if (err) {
            return callback(err, false);
        }
        return callback(null, true);
    });
};
exports.readNotificationModel = readNotificationModel;
