import {
  getAllUsers,
  login,
  postEditUser,
  postNewUser,
  postNewPassword,
  postNewImage,
  checkEmailModel,
  checkNickModel,
  checkUserModel,
  getUserModel,
} from "../models/userModel";
import { Request, Response } from "express";
import { IChangePassword, IEditableUser, INewUser } from "../types/userTypes";
import multer from "multer";

export const getUsers = (req:Request,res: Response) => {
  getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ message: "Chyba při získávání uživatelů" });
    }
    res.status(200).json(users);
  });
};

export const getUser = (req:Request,res: Response) => {
  getUserModel(req.body.userId,(err, users) => {
    if (err) {
      return res.status(500).json({ message: "Chyba při získávání uživatele" });
    }
    res.status(200).json(users);
  });
};

export const createNewUser = (req: Request, res: Response) => {
  const newUser: INewUser = {
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
  postNewUser(newUser, (err, result) => {
    if (err) {
      console.log("registrace", err);
      return res.status(500).json(result);
    } else if (result) {
      res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  });
};

export const loginUser = (req: Request, res: Response) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  login(credentials, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Chyba při získávání uživatelů" });
    }
    res.status(200).json(user);
  });
};

export const editUser = (req: Request, res: Response) => {
  const editUser: Omit<IEditableUser,'image' | 'inserted'> = {
    id: req.body.id,
    phone: req.body.phone,
    country: req.body.country,
    city:req.body.city,
    address:req.body.address,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    website: req.body.website,
    band: req.body.band,
    art: req.body.art,
    description: req.body.description,
    nick: req.body.nick,
  };
  postEditUser(editUser, (err, result) => {
    if (err) {
      console.log("uprava usera", err);
      return res.status(500).json(result);
    } else if (result) {
      res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  });
};


export const changePassword = (req:Request,res:Response) =>{
  const newPass:IChangePassword = {
    id:req.body.id,
    old:req.body.old,
    new:req.body.new,
  };
  postNewPassword(newPass,(err,result)=>{
    if (err) {
      console.log("uprava hesla", err);
      return res.status(500).json(result);
    } else if (result) {
      res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  });
};

export const checkEmail = (req:Request,res:Response) => {
  const email = req.body.email;

  checkEmailModel(email,(err,result)=>{
    if (err) {
      return res.status(500).json(result);
    } else{
      res.status(200).json(result);
    }
  });
};

export const checkNick = (req:Request,res:Response) => {
  const nick = req.body.nick;

  checkNickModel(nick,(err,result)=>{
    if (err) {
      return res.status(500).json(result);
    } else{
      res.status(200).json(result);
    }
  });
};

export const checkUser = (req:Request,res:Response) => {
  const id = req.body.id;

  checkUserModel(id,(err,result)=>{
    if (err) {
      return res.status(500).json(result);
    } else{
      res.status(200).json(result);
    }
  });
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadUserImage = (req: Request, res: Response) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Chyba při nahrávání souboru', error: err });
    }

    if (!req.body.image) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.body.user;

    postNewImage(req.body.image, userId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: result.message });
      } else {
        res.status(200).json({
          message: result.message,
          imagePath: `/uploads/users/user${userId}`,
        });
      }
    });
  });
};