"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountriesModel = exports.getArtsModel = exports.getPlacesModdel = void 0;
const database_1 = require("../controllers/database");
const getPlacesModdel = (callback) => {
    database_1.db.query("SELECT id, city, spot FROM places ORDER BY city,spot ASC", (err, res) => {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, res);
        }
    });
};
exports.getPlacesModdel = getPlacesModdel;
const getArtsModel = (callback) => {
    database_1.db.query("SELECT id, name FROM arts ORDER BY name ASC", (err, res) => {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, res);
        }
    });
};
exports.getArtsModel = getArtsModel;
const getCountriesModel = (callback) => {
    database_1.db.query("SELECT id, name FROM countries ORDER BY name ASC", (err, res) => {
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, res);
        }
    });
};
exports.getCountriesModel = getCountriesModel;
