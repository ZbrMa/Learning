import { db } from "../controllers/database";
import {
  GetUserResponse,
  IChangePassword,
  IEditableUser,
  IForgotPassword,
  INewUser,
  IUser,
  IUserStatistcs,
} from "../types/userTypes";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { hashPass, randomPass } from "../utils/passwordUtils";
import bcrypt from "bcrypt";
import { IMessageResponse } from "../types/responseTypes";
import {
  generateChangePassEmail,
  generateRegisterEmail,
} from "../utils/emailContents";
import { IArt } from "../types/filterTypes";

const JWT_SECRET = "tajne_heslo";
//const SERVER_NAME = "http://localhost:5000";
const SERVER_NAME = "https://api.buskup.com";

const mailer = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "buskingtest@gmail.com",
    pass: "eskdiwboztqmerlm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const getAllUsers = async (
  callback: (err: Error | null, results?: GetUserResponse[]) => void
) => {
  const usersQuery = `SELECT 
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
  u.band
  FROM users u
  ORDER BY u.id`;

  const artsQuery = `SELECT a.id, a.name, ua.user_id as userId FROM user_art ua LEFT JOIN arts a ON ua.art_id = a.id`;

  try {
    const [users] = await db
      .promise()
      .query<IUser[] & RowDataPacket[]>(usersQuery);
    const [arts] = await db
      .promise()
      .query<IArt[] & RowDataPacket[]>(artsQuery);

    const response: GetUserResponse[] = users.map((user) => {
      const userArts = arts.filter((art) => art.userId === user.id);
      return { ...user, arts: userArts };
    });
    return callback(null, response);
  } catch (err) {
    console.error(err);
    return callback(err as Error);
  }

  /*db.query<IUser[] & RowDataPacket[]>(
   ,
    (err, res) => {
      if (err) {
        console.log("model", err);
        return callback(err);
      } else {
        return callback(null, res);
      }
    }
  );*/
};

export const getUserModel = async (
  userId: number,
  callback: (err: Error | null, response: GetUserResponse | null) => void
) => {
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
    u.band,
    u.lang
    FROM users u
    LEFT JOIN countries c ON u.country = c.id
    WHERE u.id = ? LIMIT 1`;

  const arts_sql = `SELECT a.id, a.name FROM user_art ua LEFT JOIN arts a ON ua.art_id = a.id WHERE ua.user_id = ?`;

  try {
    const [user] = await db
      .promise()
      .query<IUser[] & RowDataPacket[]>(sql, userId);

    const [userArts] = await db
      .promise()
      .query<IArt[] & RowDataPacket[]>(arts_sql, userId);

    return callback(null, { ...user[0], arts: userArts });
  } catch (err) {
    console.error(err);
    return callback(err as Error, null);
  }
};

export const postNewUser = async (
  user: INewUser,
  callback: (err: Error | null, result: boolean | string) => void
) => {
  const hashedPass = await hashPass("admin", 10);
  if (hashedPass instanceof Error) {
    return callback(hashedPass, false);
  }

  const params = [
    user.name,
    user.surname,
    hashedPass,
    user.email,
    user.nick,
    user.birth,
    user.country,
    user.city,
    user.address,
    user.band,
    user.phone,
    user.lang
  ];

  const sql = `
      INSERT INTO users (
       inserted, name, surname, password, email, nick, birth, country, city, address, band, phone, lang
      ) VALUES (CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(sql, params, async (err, res) => {
    if (err) {
      console.error("Database error:", err.message);
      return callback(err, false);
    } else {
      try {
        const { subject, text } = generateRegisterEmail(user.lang ?? 'en', user.nick);
        const success = await mailer.sendMail({
          from: '"Busk-Up team" <buskingtest@gmail.com>',
          to: user.email,
          subject: subject,
          html: text,
        });

        if (success.accepted && success.accepted.length > 0) {
          return callback(null, true);
        } else {
          console.error("E-mail nebyl přijat serverem příjemce.");
          return callback(null, false);
        }
      } catch (mailError) {
        console.error("Chyba při odesílání e-mailu:", mailError);
        return callback(null, false);
      }
    }
  });
};

export const login = async (
  user: Pick<IUser, "email" | "password">,
  callback: (
    err: Error | null,
    result: { user: GetUserResponse; token: string } | string
  ) => void
) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  const arts_sql = `SELECT a.id, a.name FROM user_art ua LEFT JOIN arts a ON ua.art_id = a.id WHERE ua.user_id = ?`;

  try {
    db.query<IUser[] & RowDataPacket[]>(sql, [user.email], async (err, res) => {
      if (err) {
        console.error("Database error:", err.message);
        return callback(err, "Server error. Try it later.");
      }

      if (res.length === 0) {
        return callback(null, "Invalid login credentials.");
      }

      const userData: IUser = res[0];

      const match = await bcrypt.compare(user.password, userData.password);
      if (!match) {
        return callback(null, "Invalid login credentials.");
      }

      const token = jwt.sign(
        { id: userData.id, email: userData.email },
        JWT_SECRET,
        { expiresIn: "30m" }
      );

      const [arts] = await db
        .promise()
        .query<IArt[] & RowDataPacket[]>(arts_sql, userData.id);

      return callback(null, {
        user: { ...userData, arts: arts },
        token: token,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return callback(error as Error, "Server error. Try it later.");
  }
};

export const resetPassModel = async (
  email: string,
  lang: "cs" | "en" | "de",
  callback: (err: Error | null, result: IMessageResponse) => void
) => {
  const resetPass = randomPass(10);

  try {
    const hashedPass = await hashPass(resetPass, 10);
    if (hashedPass instanceof Error) {
      return callback(hashedPass, {
        success: false,
        message: "Server error. Try it later.",
      });
    }

    const checkUserSQL = "SELECT id FROM users WHERE email = ?";
    const [userRows] = await db
      .promise()
      .query<RowDataPacket[]>(checkUserSQL, [email]);

    if (userRows.length === 0) {
      return callback(null, {
        success: false,
        message: "Check email address.",
      });
    }

    const updatePassSQL = "UPDATE users SET password = ? WHERE email = ?";
    await db.promise().query(updatePassSQL, [hashedPass, email]);

    const { subject, text } = generateChangePassEmail(lang, resetPass);

    const success = await mailer.sendMail({
      from: '"Busk-Up team" <buskingtest@gmail.com>',
      to: email,
      subject: subject,
      html: text,
    });

    if (success.accepted && success.accepted.length > 0) {
      return callback(null, {
        success: true,
        message: "New password was sent to your email address.",
      });
    } else {
      console.error("E-mail nebyl přijat serverem příjemce.");
      return callback(null, {
        success: false,
        message: "Server error. Try it later.",
      });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return callback(error as Error, {
      success: false,
      message: "Server error. Try it later.",
    });
  }
};

export const postEditUser = async (
  user: Omit<IEditableUser, "image" | "inserted">,
  arts: number[],
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
    user.description,
    user.nick,
    user.id,
  ];

  const getArtsQuery = `SELECT art_id FROM user_arts WHERE user_id = ?`;
  const deleteArtQuery = `DELETE * FROM user_art WHERE user_id = ?`;
  const insertArtQuery = `INSERT INTO user_arts (user_id, art_id) VALUES ?;`;

  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(sql, params);

    const [dbArts] = await connection.query<
      { art_id: number }[] & RowDataPacket[]
    >(getArtsQuery, [user.id]);
    const currentArtIds = dbArts.map((row) => row.art_id);
    const artsToAdd = arts.filter((artId) => !currentArtIds.includes(artId));
    const artsToRemove = currentArtIds.filter((artId) => !arts.includes(artId));

    if (artsToAdd.length > 0) {
      const values = artsToAdd.map((artId) => [user.id, artId]);
      await connection.query(insertArtQuery, [values]);
    }

    if (artsToRemove.length > 0) {
      await connection.query(deleteArtQuery, [user.id, arts]);
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.error(err);
    return callback(err as Error, false);
  } finally {
    connection.rollback();
  }
};

export const newPassModel = async (
  newPass: IChangePassword,
  callback: (
    err: Error | null,
    result: { success: boolean; message: string }
  ) => void
) => {
  const checkSql = `SELECT * FROM users WHERE id = ?`;
  const checkParams = [newPass.id];

  try {
    const [res] = await db
      .promise()
      .query<RowDataPacket[]>(checkSql, checkParams);

    if (res.length === 0) {
      return callback(null, { success: false, message: "User not find." });
    }

    const user = res[0];
    const isMatch = await bcrypt.compare(newPass.old, user.password);

    if (!isMatch) {
      return callback(null, {
        success: false,
        message: "Invalid old password",
      });
    }

    const hashedNewPass = await bcrypt.hash(newPass.new, 10);

    const oldAndNewMatch = await bcrypt.compare(newPass.old, hashedNewPass);

    if (oldAndNewMatch)
      return callback(null, {
        success: false,
        message: "The old password cannot be the same as the new password",
      });

    const updateSql = `UPDATE users SET password = ? WHERE id = ?`;
    const updateParams = [hashedNewPass, newPass.id];
    await db.promise().query(updateSql, updateParams);

    return callback(null, {
      success: true,
      message: "Password was changed.",
    });
  } catch (err) {
    console.error("Chyba při změně hesla:", err);
    return callback(err as Error, {
      success: false,
      message: "Server error. Try it later.",
    });
  }
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
      console.log("posílám email");
      return callback(null, {
        success: true,
        message: "Zkontroluj svou emailovou schránku.",
      });
    } else {
      return callback(null, {
        success: false,
        message: "Zkontroluj zadanou emailovou adresu.",
      });
    }
  });
};

export const checkEmailModel = (
  email: string,
  callback: (error: Error | null, result: boolean) => void
) => {
  const sql = "SELECT email FROM users WHERE email = ?";

  db.query<RowDataPacket[]>(sql, email, (err, res) => {
    if (err) {
      return callback(err, false);
    } else if (res.length > 0) {
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  });
};

export const checkNickModel = (
  nick: string,
  callback: (error: Error | null, result: boolean) => void
) => {
  const sql = "SELECT nick FROM users WHERE nick = ?";

  db.query<RowDataPacket[]>(sql, nick, (err, res) => {
    if (err) {
      return callback(err, false);
    } else if (res.length > 0) {
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  });
};

export const checkUserModel = (
  id: number,
  callback: (
    error: Error | null,
    result: { message: string; success: boolean }
  ) => void
) => {
  const sql = "UPDATE users SET checked = 1 WHERE id = ?";

  db.query(sql, id, (err, res) => {
    if (err) {
      return callback(err, {
        message: "Potvrzení se nezdařilo.",
        success: false,
      });
    } else {
      return callback(null, {
        message: `Uživatel ${id} byl potvrzen.`,
        success: true,
      });
    }
  });
};

export const saveUserImage = (
  userId: number,
  imageBuffer: Buffer,
  originalName: string,
  callback: (
    err: Error | null,
    result: { success: boolean; message: string; imagePath?: string }
  ) => void
) => {
  try {
    const uploadDir = path.join(__dirname, "../uploads/users");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExtension = path.extname(originalName);
    const fileName = `user${userId}${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFile(filePath, imageBuffer, (err) => {
      if (err) {
        console.error("Chyba při ukládání souboru:", err);
        return callback(err, {
          success: false,
          message: "Chyba při ukládání obrázku.",
        });
      }

      const imageUrl = SERVER_NAME + `/uploads/users/${fileName}`;

      const sql = "UPDATE users SET image = ? WHERE id = ?";
      const params = [imageUrl, userId];

      db.query(sql, params, (dbErr, dbRes) => {
        if (dbErr) {
          console.error("Chyba při ukládání cesty do databáze:", dbErr);
          return callback(dbErr, {
            success: false,
            message: "Chyba při ukládání cesty k obrázku.",
          });
        }

        callback(null, {
          success: true,
          message: "Obrázek byl úspěšně uložen.",
          imagePath: imageUrl,
        });
      });
    });
  } catch (error) {
    console.error("Chyba při zpracování obrázku:", error);
    callback(error as Error, {
      success: false,
      message: "Chyba při zpracování obrázku.",
    });
  }
};

export const userStatisticsModel = (
  userId: number,
  callback: (err: Error | null, response: IUserStatistcs | null) => void
) => {
  const sql = `SELECT 
                  COUNT(*) AS eventCount,
                  COUNT(DISTINCT e.place_id) AS placeCount,
                  SUM(TIME_TO_SEC(TIMEDIFF(e.event_end, e.event_start)) / 3600) AS hourCount,
                  COUNT(CASE 
                            WHEN e.event_day >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) THEN 1 
                            ELSE NULL 
                        END) AS sixMonthsCount
              FROM events e
              WHERE 
                  e.user_id = ? 
                  AND CONCAT(e.event_day, ' ', e.event_end) < NOW()
              GROUP BY e.user_id;
              `;
  db.query<IUserStatistcs[] & RowDataPacket[]>(sql, [userId], (err, res) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    if (res.length > 0) {
      return callback(null, res[0]);
    } else {
      return callback(null, null);
    }
  });
};
