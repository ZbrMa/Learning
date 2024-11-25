import { RowDataPacket } from "mysql2";
import { db } from "../controllers/database";
import { IArt, IPlace,ICountry } from "../types/filterTypes";

export const getPlacesModdel = (
  callback: (err: Error | null, results: IPlace[] | null) => void
) => {
  db.query<IPlace[] & RowDataPacket[]>(
    "SELECT id, city, spot FROM places ORDER BY city,spot ASC",
    (err, res) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, res);
      }
    }
  );
};

export const getArtsModel = (
  callback: (err: Error | null, results: IArt[] | null) => void
) => {
  db.query<IArt[] & RowDataPacket[]>(
    "SELECT id, name FROM arts ORDER BY name ASC",
    (err, res) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, res);
      }
    }
  );
};

export const getCountriesModel = (
  callback: (err: Error | null, results: ICountry[] | null) => void
) => {
  db.query<IArt[] & RowDataPacket[]>(
    "SELECT id, name FROM countries ORDER BY name ASC",
    (err, res) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, res);
      }
    }
  );
};
