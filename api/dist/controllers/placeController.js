"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlace = exports.updatePlace = exports.deletePlace = exports.getAllPlaces = void 0;
const placeModel_1 = require("../models/placeModel");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage }).single('image');
const getAllPlaces = (req, res) => {
    (0, placeModel_1.getPlacesModel)((err, result) => {
        if (err) {
            res.status(500).json({ message: 'Při získávání měst nastala chyba' });
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.getAllPlaces = getAllPlaces;
const deletePlace = (req, res) => {
    (0, placeModel_1.deletePlaceModel)(req.body.id, (err, result) => {
        if (err) {
            res.status(500).json(result);
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.deletePlace = deletePlace;
const updatePlace = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Chyba při nahrávání souboru.' });
        }
        const place = JSON.parse(req.body.place);
        const image = req.file;
        if (isNaN(place.id)) {
            return res.status(400).json({ success: false, message: 'ID místa je neplatné.' });
        }
        const callback = (err, result) => {
            if (err) {
                return res.status(500).json(result);
            }
            return res.status(200).json(result);
        };
        if (image) {
            (0, placeModel_1.editPlaceModel)(place, image.buffer, image.originalname, callback);
        }
        else {
            (0, placeModel_1.editPlaceModel)(place, null, null, callback);
        }
    });
};
exports.updatePlace = updatePlace;
const createPlace = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Chyba při nahrávání souboru.' });
        }
        const place = JSON.parse(req.body.place);
        const image = req.file;
        const callback = (err, result) => {
            if (err) {
                return res.status(500).json(result);
            }
            return res.status(200).json(result);
        };
        image && (0, placeModel_1.createPlaceModel)(place, image.buffer, image.originalname, callback);
    });
};
exports.createPlace = createPlace;
