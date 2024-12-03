import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../controllers/database";
import { IPlace, INewPlace } from "../types/placeTypes";
import { IMessageResponse } from "../types/responseTypes";
import path from 'path';
import fs from 'fs';

const SERVER_NAME = "http://localhost:5000";

export const getPlacesModel = (callback:(err:Error | null, places:IPlace[] | null)=>void) => {
    const sql = 'SELECT * FROM places';

    db.query<IPlace[] & RowDataPacket[]>(sql,(err,res)=>{
        if(err){
            return callback(err,null);
        }
        return callback(null,res);
    });
};

export const deletePlaceModel = (id:number,callback:(err:Error | null, response:IMessageResponse)=>void) => {
  const sql = 'DELETE * FROM places WHERE id = ?';

  db.query(sql,id,(err,res)=>{
      if(err){
          return callback(err,{success:false,message:'Nepodařilo se odstranit místo'});
      }
      return callback(null,{success:true,message:'Místo bylo úspěšně odstraněno.'});
  });
};

export const editPlaceModel = (
    place: IPlace,
    imageBuffer: Buffer | null,
    originalName: string | null,
    callback: (err: Error | null, response: IMessageResponse) => void
  ) => {
    try {
      if (imageBuffer && originalName) {
        const uploadDir = path.join(__dirname, '../uploads/places');
  
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
  
        const fileExtension = path.extname(originalName);
        const fileName = `place${place.id}${fileExtension}`;
        const filePath = path.join(uploadDir, fileName);
  
        fs.writeFile(filePath, imageBuffer, (err) => {
          if (err) {
            console.error('Chyba při ukládání souboru:', err);
            return callback(err, { success: false, message: 'Chyba při ukládání obrázku.' });
          }
  
          const imageUrl = SERVER_NAME + `/uploads/places/${fileName}`;
          updatePlaceInDatabase(place, imageUrl, callback);
        });
      } else {
        updatePlaceInDatabase(place, undefined, callback);
      }
    } catch (error) {
      console.error('Chyba při zpracování místa:', error);
      callback(error as Error, { success: false, message: 'Chyba při zpracování místa.' });
    }
  };
  
  const updatePlaceInDatabase = (
    place: IPlace,
    imageUrl: string | undefined,
    callback: (err: Error | null, response: IMessageResponse) => void
  ) => {
    const sql = imageUrl
      ? 'UPDATE places SET city = ?, spot = ?, longitude = ?, latitude = ?, about = ?, image = ? WHERE id = ?'
      : 'UPDATE places SET city = ?, spot = ?, longitude = ?, latitude = ?, about = ? WHERE id = ?';
  
    const params = imageUrl
      ? [place.city, place.spot, place.longitude, place.latitude, place.about, imageUrl, place.id]
      : [place.city, place.spot, place.longitude, place.latitude, place.about, place.id];
  
    db.query(sql, params, (dbErr, dbRes) => {
      if (dbErr) {
        console.error('Chyba při aktualizaci místa v databázi:', dbErr);
        return callback(dbErr, { success: false, message: 'Chyba při aktualizaci místa.' });
      }
  
      callback(null, { success: true, message: 'Místo bylo úspěšně aktualizováno.' });
    });
  };

  export const createPlaceModel = (
    place: INewPlace,
    imageBuffer: Buffer,
    originalName: string,
    callback: (err: Error | null, response: IMessageResponse) => void
  ) => {
    try {
      const sqlInsert =
        'INSERT INTO places (city, spot, longitude, latitude, about) VALUES (?, ?, ?, ?, ?)';
      const paramsInsert = [place.city, place.spot, place.longitude, place.latitude, place.about];
  
      db.query(sqlInsert, paramsInsert, (dbErr, dbRes: ResultSetHeader) => {
        if (dbErr) {
          console.error('Chyba při vytváření místa v databázi:', dbErr);
          return callback(dbErr, { success: false, message: 'Chyba při vytváření místa.' });
        }
  
        const placeId = dbRes.insertId;
        const uploadDir = path.join(__dirname, '../uploads/places');
  
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
  
        const fileExtension = path.extname(originalName);
        const fileName = `place_${placeId}${fileExtension}`;
        const filePath = path.join(uploadDir, fileName);
  
        fs.writeFile(filePath, imageBuffer, (err) => {
          if (err) {
            console.error('Chyba při ukládání souboru:', err);
            return callback(err, { success: false, message: 'Chyba při ukládání obrázku.' });
          }
  
          const imageUrl = SERVER_NAME + `/uploads/places/${fileName}`;
  
          const sqlUpdate = 'UPDATE places SET image = ? WHERE id = ?';
          const paramsUpdate = [imageUrl, placeId];
  
          db.query(sqlUpdate, paramsUpdate, (dbUpdateErr) => {
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
    } catch (error) {
      console.error('Chyba při zpracování místa:', error);
      callback(error as Error, { success: false, message: 'Chyba při zpracování místa.' });
    }
  };
  