"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountries = exports.getArts = exports.getPlaces = void 0;
const filterModel_1 = require("../models/filterModel");
const getPlaces = (req, res) => {
    (0, filterModel_1.getPlacesModdel)((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Chyba při získávání míst.' });
        }
        return res.status(200).json(results);
    });
};
exports.getPlaces = getPlaces;
const getArts = (req, res) => {
    (0, filterModel_1.getArtsModel)((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Chyba při získávání umění.' });
        }
        return res.status(200).json(results);
    });
};
exports.getArts = getArts;
const getCountries = (req, res) => {
    (0, filterModel_1.getCountriesModel)((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Chyba při získávání Země.' });
        }
        return res.status(200).json(results);
    });
};
exports.getCountries = getCountries;
