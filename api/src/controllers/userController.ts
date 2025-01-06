import {
  getAllUsers,
  login,
  postEditUser,
  postNewUser,
  newPassModel,
  resetPassModel,
  saveUserImage,
  checkEmailModel,
  checkNickModel,
  checkUserModel,
  getUserModel,
} from "../models/userModel";
import { Request, Response , RequestHandler} from "express";
import { IChangePassword, IEditableUser, IForgotPassword, INewUser, IUser } from "../types/userTypes";

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
    band: req.body.band,
    birth: req.body.birth,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    nick: req.body.nick,
  };

  const lang = (req.headers['language'] || 'en') as 'en' | 'de' | 'cs';

  postNewUser(newUser, lang, (err, result) => {
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

export const resetPassword = (req:Request,res:Response) => {
  const lang = (req.headers['language'] || 'en') as 'en' | 'de' | 'cs';

  resetPassModel(req.body.email,lang,(err,result)=>{
    if (err) {
      console.error("reset password error:", err);
      return res.status(500).json(result);
    } else if (result) {
      res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  })
};

export const editUser = (req: Request, res: Response) => {
  const editUser: Omit<IEditableUser,'image' | 'inserted'> = {
    id: req.body.user.id,
    phone: req.body.user.phone,
    country: req.body.user.country,
    city:req.body.user.city,
    address:req.body.user.address,
    facebook: req.body.user.facebook,
    instagram: req.body.user.instagram,
    twitter: req.body.user.twitter,
    website: req.body.user.website,
    band: req.body.user.band,
    description: req.body.user.description,
    nick: req.body.user.nick,
  };
  postEditUser(editUser,req.body.arts as number[] ,(err, result) => {
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
  newPassModel(newPass,(err,result)=>{
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
