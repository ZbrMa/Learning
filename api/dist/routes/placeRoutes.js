"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeController_1 = require("../controllers/placeController");
const router = express_1.default.Router();
router.get('/getAdminPlaces', placeController_1.getAllPlaces);
router.post('/createPlace', placeController_1.createPlace);
router.post('/updatePlace', placeController_1.updatePlace);
router.post('/deletePlace', placeController_1.deletePlace);
exports.default = router;
