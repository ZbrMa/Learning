"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserImage = exports.checkUser = exports.checkNick = exports.checkEmail = exports.forgotPassword = exports.changePassword = exports.editUser = exports.loginUser = exports.createNewUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const getUsers = (req, res) => {
    (0, userModel_1.getAllUsers)((err, users) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Chyba při získávání uživatelů" });
        }
        res.status(200).json(users);
    });
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    (0, userModel_1.getUserModel)(req.body.userId, (err, users) => {
        if (err) {
            return res.status(500).json({ message: "Chyba při získávání uživatele" });
        }
        res.status(200).json(users);
    });
};
exports.getUser = getUser;
const createNewUser = (req, res) => {
    const newUser = {
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        art: req.body.art,
        band: req.body.band,
        birth: req.body.birth,
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        nick: req.body.nick,
    };
    (0, userModel_1.postNewUser)(newUser, (err, result) => {
        if (err) {
            console.log("registrace", err);
            return res.status(500).json(result);
        }
        else if (result) {
            res.status(200).json(result);
        }
        else {
            return res.status(500).json(result);
        }
    });
};
exports.createNewUser = createNewUser;
const loginUser = (req, res) => {
    const credentials = {
        email: req.body.email,
        password: req.body.password,
    };
    (0, userModel_1.login)(credentials, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Chyba při získávání uživatelů" });
        }
        res.status(200).json(user);
    });
};
exports.loginUser = loginUser;
const editUser = (req, res) => {
    const editUser = {
        id: req.body.id,
        phone: req.body.phone,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        website: req.body.website,
        band: req.body.band,
        art: req.body.art,
        description: req.body.description,
        nick: req.body.nick,
    };
    (0, userModel_1.postEditUser)(editUser, (err, result) => {
        if (err) {
            console.log("uprava usera", err);
            return res.status(500).json(result);
        }
        else if (result) {
            res.status(200).json(result);
        }
        else {
            return res.status(500).json(result);
        }
    });
};
exports.editUser = editUser;
const changePassword = (req, res) => {
    const newPass = {
        id: req.body.id,
        old: req.body.old,
        new: req.body.new,
    };
    (0, userModel_1.postNewPassword)(newPass, (err, result) => {
        if (err) {
            console.log("uprava hesla", err);
            return res.status(500).json(result);
        }
        else if (result) {
            res.status(200).json(result);
        }
        else {
            return res.status(500).json(result);
        }
    });
};
exports.changePassword = changePassword;
const forgotPassword = (req, res) => {
    const newPass = {
        email: req.body.email,
    };
    (0, userModel_1.forgotPasswordModel)(newPass, (err, result) => {
        if (err) {
            console.log("zapomenute heslo", err);
            return res.status(500).json(result);
        }
        else if (result) {
            res.status(200).json(result);
        }
        else {
            return res.status(500).json(result);
        }
    });
};
exports.forgotPassword = forgotPassword;
const checkEmail = (req, res) => {
    const email = req.body.email;
    (0, userModel_1.checkEmailModel)(email, (err, result) => {
        if (err) {
            return res.status(500).json(result);
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.checkEmail = checkEmail;
const checkNick = (req, res) => {
    const nick = req.body.nick;
    (0, userModel_1.checkNickModel)(nick, (err, result) => {
        if (err) {
            return res.status(500).json(result);
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.checkNick = checkNick;
const checkUser = (req, res) => {
    const id = req.body.id;
    (0, userModel_1.checkUserModel)(id, (err, result) => {
        if (err) {
            return res.status(500).json(result);
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.checkUser = checkUser;
const uploadUserImage = (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const image = req.file;
    if (!image) {
        res.status(400).json({ success: false, message: 'Obrázek nebyl poskytnut.' });
        return;
    }
    if (isNaN(userId)) {
        res.status(400).json({ success: false, message: 'ID uživatele je neplatné.' });
        return;
    }
    (0, userModel_1.saveUserImage)(userId, image.buffer, image.originalname, (err, result) => {
        if (err) {
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    });
    return;
};
exports.uploadUserImage = uploadUserImage;
