import {
  getAllUsers,
  login,
  postEditUser,
  postNewUser,
  postNewPassword,
  forgotPasswordModel,
  saveUserImage,
  checkEmailModel,
  checkNickModel,
  checkUserModel,
  getUserModel,
} from "../models/userModel";
import { Request, Response,NextFunction , RequestHandler} from "express";
import { IChangePassword, IEditableUser, IForgotPassword, INewUser } from "../types/userTypes";
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

export const forgotPassword = (req:Request,res:Response) =>{
  const newPass:IForgotPassword = {
    email:req.body.email,
  };
  forgotPasswordModel(newPass,(err,result)=>{
    if (err) {
      console.log("zapomenute heslo", err);
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

export const uploadUserImage: RequestHandler = (req, res, next) => {
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

  saveUserImage(userId, image.buffer, image.originalname, (err, result) => {
      if (err) {
          res.status(500).json(result);
          return;
      }
      res.status(200).json(result);
  });

  return;
};
