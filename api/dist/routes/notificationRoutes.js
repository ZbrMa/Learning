"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
router.post('/getIncommingNotifications', notificationController_1.getIncommingNotifications);
router.post('/getSentNotifications', notificationController_1.getSentNotifications);
router.post('/readNotification', notificationController_1.readNotification);
router.post('/sendNewNotification', notificationController_1.sendNewNotification);
exports.default = router;
