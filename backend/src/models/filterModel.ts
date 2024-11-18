import { RowDataPacket } from "mysql2";
import { db } from "../controllers/database";
import { IArt, IPlace } from "../types/filterTypes";

export const getPlacesModdel = (
  callback: (err: Error | null, results: IPlace[] | null) => void
) => {
  db.query<IPlace[] & RowDataPacket[]>(
    "SELECT id, city, spot FROM places",
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
    "SELECT id, name FROM arts",
    (err, res) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, res);
      }
    }
  );
};
