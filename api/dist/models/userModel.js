"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserImage = exports.checkUserModel = exports.checkNickModel = exports.checkEmailModel = exports.forgotPasswordModel = exports.postNewPassword = exports.postEditUser = exports.login = exports.postNewUser = exports.getUserModel = exports.getAllUsers = void 0;
const database_1 = require("../controllers/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const JWT_SECRET = "tajne_heslo";
const SERVER_NAME = "http://localhost:5000";
const getAllUsers = (callback) => {
    console.log(database_1.db);
    database_1.db.query(`SELECT 
    u.id ,
    u.name,
    u.surname ,
    u.nick,
    u.birth ,
    u.email ,
    u.phone ,
    u.country,
    u.city,
    u.address,
    u.website ,
    u.twitter,
    u.instagram ,
    u.facebook ,
    u.checked ,
    u.role ,
    u.band ,
    a.name as art
    FROM users u
    LEFT JOIN arts a ON u.art = a.id ORDER BY u.id`, (err, res) => {
        if (err) {
            console.log('model', err);
            return callback(err);
        }
        else {
            return callback(null, res);
        }
    });
};
exports.getAllUsers = getAllUsers;
const getUserModel = (userId, callback) => {
    const sql = `SELECT 
    u.id ,
    u.inserted,
    u.name,
    u.surname ,
    u.nick,
    u.birth ,
    u.email ,
    u.image,
    u.phone ,
    u.description,
    u.country,
    c.name as countryName,
    u.city,
    u.address,
    u.website ,
    u.twitter,
    u.instagram ,
    u.facebook ,
    u.checked ,
    u.role ,
    u.band ,
    a.name as art
    FROM users u
    LEFT JOIN arts a ON u.art = a.id 
    LEFT JOIN countries c ON u.country = c.id
    WHERE u.id = ? LIMIT 1`;
    database_1.db.query(sql, userId, (err, res) => {
        const response = res[0];
        if (err) {
            return callback(err, null);
        }
        else {
            return callback(null, response);
        }
    });
};
exports.getUserModel = getUserModel;
const postNewUser = (user, callback) => {
    const params = [
        user.name,
        user.surname,
        user.password,
        user.email,
        user.nick,
        user.birth,
        user.country,
        user.city,
        user.address,
        user.band,
        user.phone,
        user.art,
    ];
    const sql = `
      INSERT INTO users (
       inserted, name, surname, password, email, nick, birth, country, city, address, band, phone, art
      ) VALUES (CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    database_1.db.query(sql, params, (err, res) => {
        if (err) {
            console.error("Database error:", err.message);
            return callback(err, false);
        }
        else {
            return callback(null, true);
        }
    });
};
exports.postNewUser = postNewUser;
const login = (user, callback) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const params = [user.email, user.password];
    database_1.db.query(sql, params, (err, res) => {
        if (err) {
            console.error("Database error:", err.message);
            return callback(err, "Nastala chyba. Zkuste to později.");
        }
        else if (res.length > 0) {
            const userData = res[0];
            const token = jsonwebtoken_1.default.sign({ id: userData.id, email: userData.email }, JWT_SECRET, {
                expiresIn: "30m",
            });
            return callback(null, { user: userData, token });
        }
        else {
            return callback(null, "Nesprávné přihlašovací údaje.");
        }
    });
};
exports.login = login;
const postEditUser = (user, callback) => {
    const sql = `
        UPDATE users
        SET
          phone=?,
          country=?,
          city=?,
          address=?,
          facebook=?,
          instagram=?,
          twitter=?,
          website=?,
          band=?,
          art=?,
          description=?,
          nick=?
         WHERE id = ?
    `;
    const params = [
        user.phone,
        user.country,
        user.city,
        user.address,
        user.facebook,
        user.instagram,
        user.twitter,
        user.website,
        user.band,
        user.art,
        user.description,
        user.nick,
        user.id,
    ];
    database_1.db.query(sql, params, (err, res) => {
        if (err) {
            console.error("Database error:", err.message);
            return callback(err, false);
        }
        else {
            return callback(null, true);
        }
    });
};
exports.postEditUser = postEditUser;
const postNewPassword = (newPass, callback) => {
    const checkSql = `SELECT * FROM users WHERE id = ? AND password = ?`;
    const checkParams = [newPass.id, newPass.old];
    const sql = `UPDATE users SET password = ? WHERE id = ?`;
    const params = [newPass.new, newPass.id];
    database_1.db.query(checkSql, checkParams, (err, res) => {
        if (err) {
            return callback(err, {
                success: false,
                message: "Změna hesla se nezdařila. Zkuste to později.",
            });
        }
        const result = res;
        if (result.length > 0) {
            database_1.db.query(sql, params, (updateErr, updateRes) => {
                if (err) {
                    return callback(updateErr, {
                        success: false,
                        message: "Změna hesla se nezdařila. Zkuste to později.",
                    });
                }
                else {
                    return callback(null, {
                        success: true,
                        message: "Heslo bylo změněno",
                    });
                }
            });
        }
        else {
            return callback(null, { success: false, message: "Nesprávné heslo." });
        }
    });
    params;
};
exports.postNewPassword = postNewPassword;
const forgotPasswordModel = (newPass, callback) => {
    const checkSql = `SELECT * FROM users WHERE email = ?`;
    database_1.db.query(checkSql, newPass.email, (err, res) => {
        if (err) {
            return callback(err, {
                success: false,
                message: "Nastala chyba. Zkus to později.",
            });
        }
        const result = res;
        if (result.length > 0) {
            console.log('posílám email');
            return callback(null, { success: true, message: "Zkontroluj svou emailovou schránku." });
        }
        else {
            return callback(null, { success: false, message: "Zkontroluj zadanou emailovou adresu." });
        }
    });
};
exports.forgotPasswordModel = forgotPasswordModel;
const checkEmailModel = (email, callback) => {
    const sql = 'SELECT email FROM users WHERE email = ?';
    database_1.db.query(sql, email, (err, res) => {
        if (err) {
            return callback(err, false);
        }
        else if (res.length > 0) {
            return callback(null, false);
        }
        else {
            return callback(null, true);
        }
    });
};
exports.checkEmailModel = checkEmailModel;
const checkNickModel = (nick, callback) => {
    const sql = 'SELECT nick FROM users WHERE nick = ?';
    database_1.db.query(sql, nick, (err, res) => {
        if (err) {
            return callback(err, false);
        }
        else if (res.length > 0) {
            return callback(null, false);
        }
        else {
            return callback(null, true);
        }
    });
};
exports.checkNickModel = checkNickModel;
const checkUserModel = (id, callback) => {
    const sql = 'UPDATE users SET checked = 1 WHERE id = ?';
    database_1.db.query(sql, id, (err, res) => {
        if (err) {
            return callback(err, { message: 'Potvrzení se nezdařilo.', success: false });
        }
        else {
            return callback(null, { message: `Uživatel ${id} byl potvrzen.`, success: true });
        }
    });
};
exports.checkUserModel = checkUserModel;
const saveUserImage = (userId, imageBuffer, originalName, callback) => {
    try {
        const uploadDir = path_1.default.join(__dirname, '../uploads/users');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const fileExtension = path_1.default.extname(originalName);
        const fileName = `user${userId}${fileExtension}`;
        const filePath = path_1.default.join(uploadDir, fileName);
        fs_1.default.writeFile(filePath, imageBuffer, (err) => {
            if (err) {
                console.error('Chyba při ukládání souboru:', err);
                return callback(err, { success: false, message: 'Chyba při ukládání obrázku.' });
            }
            const imageUrl = SERVER_NAME + `/uploads/users/${fileName}`;
            const sql = 'UPDATE users SET image = ? WHERE id = ?';
            const params = [imageUrl, userId];
            database_1.db.query(sql, params, (dbErr, dbRes) => {
                if (dbErr) {
                    console.error('Chyba při ukládání cesty do databáze:', dbErr);
                    return callback(dbErr, { success: false, message: 'Chyba při ukládání cesty k obrázku.' });
                }
                callback(null, { success: true, message: 'Obrázek byl úspěšně uložen.', imagePath: imageUrl });
            });
        });
    }
    catch (error) {
        console.error('Chyba při zpracování obrázku:', error);
        callback(error, { success: false, message: 'Chyba při zpracování obrázku.' });
    }
};
exports.saveUserImage = saveUserImage;
