"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const filterController_1 = require("../controllers/filterController");
const router = express_1.default.Router();
router.get('/places', filterController_1.getPlaces);
router.get('/arts', filterController_1.getArts);
router.get('/countries', filterController_1.getCountries);
exports.default = router;
