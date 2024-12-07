"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaceModel = exports.editPlaceModel = exports.deletePlaceModel = exports.getPlacesModel = void 0;
const database_1 = require("../controllers/database");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const SERVER_NAME = "http://localhost:5000";
const getPlacesModel = (callback) => {
    const sql = 'SELECT * FROM places';
    database_1.db.query(sql, (err, res) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    });
};
exports.getPlacesModel = getPlacesModel;
const deletePlaceModel = (id, callback) => {
    const sql = 'DELETE * FROM places WHERE id = ?';
    database_1.db.query(sql, id, (err, res) => {
        if (err) {
            return callback(err, { success: false, message: 'Nepodařilo se odstranit místo' });
        }
        return callback(null, { success: true, message: 'Místo bylo úspěšně odstraněno.' });
    });
};
exports.deletePlaceModel = deletePlaceModel;
const editPlaceModel = (place, imageBuffer, originalName, callback) => {
    try {
        if (imageBuffer && originalName) {
            const uploadDir = path_1.default.join(__dirname, '../uploads/places');
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            const fileExtension = path_1.default.extname(originalName);
            const fileName = `place${place.id}${fileExtension}`;
            const filePath = path_1.default.join(uploadDir, fileName);
            fs_1.default.writeFile(filePath, imageBuffer, (err) => {
                if (err) {
                    console.error('Chyba při ukládání souboru:', err);
                    return callback(err, { success: false, message: 'Chyba při ukládání obrázku.' });
                }
                const imageUrl = SERVER_NAME + `/uploads/places/${fileName}`;
                updatePlaceInDatabase(place, imageUrl, callback);
            });
        }
        else {
            updatePlaceInDatabase(place, undefined, callback);
        }
    }
    catch (error) {
        console.error('Chyba při zpracování místa:', error);
        callback(error, { success: false, message: 'Chyba při zpracování místa.' });
    }
};
exports.editPlaceModel = editPlaceModel;
const updatePlaceInDatabase = (place, imageUrl, callback) => {
    const sql = imageUrl
        ? 'UPDATE places SET city = ?, spot = ?, longitude = ?, latitude = ?, about = ?, image = ? WHERE id = ?'
        : 'UPDATE places SET city = ?, spot = ?, longitude = ?, latitude = ?, about = ? WHERE id = ?';
    const params = imageUrl
        ? [place.city, place.spot, place.longitude, place.latitude, place.about, imageUrl, place.id]
        : [place.city, place.spot, place.longitude, place.latitude, place.about, place.id];
    database_1.db.query(sql, params, (dbErr, dbRes) => {
        if (dbErr) {
            console.error('Chyba při aktualizaci místa v databázi:', dbErr);
            return callback(dbErr, { success: false, message: 'Chyba při aktualizaci místa.' });
        }
        callback(null, { success: true, message: 'Místo bylo úspěšně aktualizováno.' });
    });
};
const createPlaceModel = (place, imageBuffer, originalName, callback) => {
    try {
        const sqlInsert = 'INSERT INTO places (city, spot, longitude, latitude, about) VALUES (?, ?, ?, ?, ?)';
        const paramsInsert = [place.city, place.spot, place.longitude, place.latitude, place.about];
        database_1.db.query(sqlInsert, paramsInsert, (dbErr, dbRes) => {
            if (dbErr) {
                console.error('Chyba při vytváření místa v databázi:', dbErr);
                return callback(dbErr, { success: false, message: 'Chyba při vytváření místa.' });
            }
            const placeId = dbRes.insertId;
            const uploadDir = path_1.default.join(__dirname, '../uploads/places');
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            const fileExtension = path_1.default.extname(originalName);
            const fileName = `place_${placeId}${fileExtension}`;
            const filePath = path_1.default.join(uploadDir, fileName);
            fs_1.default.writeFile(filePath, imageBuffer, (err) => {
                if (err) {
                    console.error('Chyba při ukládání souboru:', err);
                    return callback(err, { success: false, message: 'Chyba při ukládání obrázku.' });
                }
                const imageUrl = SERVER_NAME + `/uploads/places/${fileName}`;
                const sqlUpdate = 'UPDATE places SET image = ? WHERE id = ?';
                const paramsUpdate = [imageUrl, placeId];
                database_1.db.query(sqlUpdate, paramsUpdate, (dbUpdateErr) => {
                    if (dbUpdateErr) {
                        console.error('Chyba při aktualizaci obrázku v databázi:', dbUpdateErr);
                        return callback(dbUpdateErr, {
                            success: false,
                            message: 'Chyba při aktualizaci cesty k obrázku.',
                        });
                    }
                    callback(null, { success: true, message: 'Místo bylo úspěšně vytvořeno.' });
                });
            });
        });
    }
    catch (error) {
        console.error('Chyba při zpracování místa:', error);
        callback(error, { success: false, message: 'Chyba při zpracování místa.' });
    }
};
exports.createPlaceModel = createPlaceModel;
