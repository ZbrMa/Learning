import { db } from "../controllers/database";
import {
  IChangePassword,
  IEditableUser,
  IForgotPassword,
  INewUser,
  IUser,
} from "../types/userTypes";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import path from "path";
import fs from 'fs';

const JWT_SECRET = "tajne_heslo";
const SERVER_NAME = "http://localhost:5000";

export const getAllUsers = (
  callback: (err: Error | null, results?: IUser[]) => void
) => {
  db.query<IUser[] & RowDataPacket[]>(`SELECT 
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
      return callback(err);
    } else {
      return callback(null, res);
    }
  });
};

export const getUserModel = (userId:number,callback:(err:Error |null, response:IUser | null)=>void)=>{

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


  db.query<RowDataPacket[]>(sql, userId, (err, res) => {
      const response = res[0] as IUser;
    if (err) {
      return callback(err,null);
    } else {
      return callback(null, response);
    }
  });

};

export const postNewUser = (
  user: INewUser,
  callback: (err: Error | null, result: boolean | string) => void
) => {
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

    db.query(sql, params, (err, res) => {
      if (err) {
        console.error("Database error:", err.message);
        return callback(
          err,false
        );
      } else {
        return callback(null, true);
      }
    });
};

export const login = (
  user: Pick<IUser, "email" | "password">,
  callback: (
    err: Error | null,
    result: { user: IUser; token: string } | string
  ) => void
) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const params = [user.email, user.password];

  db.query<RowDataPacket[]>(sql, params, (err, res) => {
    if (err) {
      console.error("Database error:", err.message);
      return callback(err, "Nastala chyba. Zkuste to později.");
    } else if (res.length > 0) {
      const userData: IUser = res[0] as IUser;
      const token = jwt.sign(
        { id: userData.id, email: userData.email },
        JWT_SECRET,
        {
          expiresIn: "30m",
        }
      );
      return callback(null, { user: userData, token });
    } else {
      return callback(null, "Nesprávné přihlašovací údaje.");
    }
  });
};

export const postEditUser = (
  user: Omit<IEditableUser,'image' | 'inserted'>,
  callback: (err: Error | null, result: boolean) => void
) => {
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

  db.query(sql, params, (err, res) => {
    if (err) {
      console.error("Database error:", err.message);
      return callback(err, false);
    } else {
      return callback(null, true);
    }
  });
};

export const postNewPassword = (
  newPass: IChangePassword,
  callback: (
    err: Error | null,
    result: { success: boolean; message: string }
  ) => void
) => {
  const checkSql = `SELECT * FROM users WHERE id = ? AND password = ?`;
  const checkParams = [newPass.id, newPass.old];

  const sql = `UPDATE users SET password = ? WHERE id = ?`;
  const params = [newPass.new, newPass.id];

  db.query(checkSql, checkParams, (err, res) => {
    if (err) {
      return callback(err, {
        success: false,
        message: "Změna hesla se nezdařila. Zkuste to později.",
      });
    }

    const result = res as RowDataPacket[];
    if (result.length > 0) {
      db.query(sql, params, (updateErr, updateRes) => {
        if (err) {
          return callback(updateErr, {
            success: false,
            message: "Změna hesla se nezdařila. Zkuste to později.",
          });
        } else {
          return callback(null, {
            success: true,
            message: "Heslo bylo změněno",
          });
        }
      });
    } else {
      return callback(null, { success: false, message: "Nesprávné heslo." });
    }
  });

  params;
};

export const forgotPasswordModel = (
  newPass: IForgotPassword,
  callback: (
    err: Error | null,
    result: { success: boolean; message: string }
  ) => void
) => {
  const checkSql = `SELECT * FROM users WHERE email = ?`;

  db.query(checkSql, newPass.email, (err, res) => {
    if (err) {
      return callback(err, {
        success: false,
        message: "Nastala chyba. Zkus to později.",
      });
    }

    const result = res as RowDataPacket[];
    if (result.length > 0) {
      console.log('posílám email');
      return callback(null,{success:true,message:"Zkontroluj svou emailovou schránku."})
    } else {
      return callback(null, { success: false, message: "Zkontroluj zadanou emailovou adresu." });
    }
  });
};


export const checkEmailModel = (email:string,callback:(error:Error| null, result:boolean)=>void) => {
  const sql = 'SELECT email FROM users WHERE email = ?';

  db.query<RowDataPacket[]>(sql,email,(err,res)=>{
    if(err) {
      return callback(err,false);
    } else if (res.length > 0) {
      return callback(null,false);
    } else {
      return callback(null,true);
    }
  });
};

export const checkNickModel = (nick:string,callback:(error:Error| null, result:boolean)=>void) => {
  const sql = 'SELECT nick FROM users WHERE nick = ?';

  db.query<RowDataPacket[]>(sql,nick,(err,res)=>{
    if(err) {
      return callback(err,false);
    } else if (res.length > 0) {
      return callback(null,false);
    } else {
      return callback(null,true);
    }
  });
};

export const checkUserModel = (id:number,callback:(error:Error| null, result:{message:string,success:boolean})=>void) => {
  const sql = 'UPDATE users SET checked = 1 WHERE id = ?';

  db.query(sql,id,(err,res)=>{
    if(err) {
      return callback(err,{message:'Potvrzení se nezdařilo.',success:false});
    } else {
      return callback(null,{message:`Uživatel ${id} byl potvrzen.`,success:true});
    } 
  });

};

export const saveUserImage = (
  userId: number,
  imageBuffer: Buffer,
  originalName: string,
  callback: (err: Error | null, result: { success: boolean; message: string, imagePath?:string }) => void
) => {
  try {
      const uploadDir = path.join(__dirname, '../uploads/users');

      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExtension = path.extname(originalName);
      const fileName = `user${userId}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFile(filePath, imageBuffer, (err) => {
          if (err) {
              console.error('Chyba při ukládání souboru:', err);
              return callback(err, { success: false, message: 'Chyba při ukládání obrázku.' });
          }

          const imageUrl = SERVER_NAME+`/uploads/users/${fileName}`;

          const sql = 'UPDATE users SET image = ? WHERE id = ?';
          const params = [imageUrl, userId];

          db.query(sql, params, (dbErr, dbRes) => {
              if (dbErr) {
                  console.error('Chyba při ukládání cesty do databáze:', dbErr);
                  return callback(dbErr, { success: false, message: 'Chyba při ukládání cesty k obrázku.' });
              }

              callback(null, { success: true, message: 'Obrázek byl úspěšně uložen.',imagePath:imageUrl});
          });
      });
  } catch (error) {
      console.error('Chyba při zpracování obrázku:', error);
      callback(error as Error, { success: false, message: 'Chyba při zpracování obrázku.' });
  }
};

