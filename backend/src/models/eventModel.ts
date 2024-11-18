import { RowDataPacket } from "mysql2";
import { db } from "../controllers/database";
import { IEventReduced } from "../types/eventTypes";
import { format } from "date-fns";
import { IEventDateRangeFilter, IEventFilter } from "../types/filterTypes";

export const upcomingEvents = (
  callback: (err: Error | null, results: IEventReduced[] | null) => void
) => {
  const sql = `   SELECT e.id, e.event_day as day, p.city, p.spot, u.nick, a.name as art, u.image 
                    FROM events as e 
                    LEFT JOIN users as u ON e.user_id = u.id
                    LEFT JOIN places as p ON e.place_id = p.id
                    LEFT JOIN arts as a ON u.art = a.id
                    WHERE e.checked = 1 
                    AND e.event_day BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY
                    ORDER BY e.event_day`;
  db.query<IEventReduced[] & RowDataPacket[]>(sql, (err, res) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else if (res.length > 0) {
      return callback(null, res);
    } else {
      return callback(err, null);
    }
  });
};

export const filteredEvents = (
  eventFilter:{range:IEventDateRangeFilter,filters:IEventFilter},
  callback: (err: Error | null, results: IEventReduced[] | null) => void
) => {
  let whereClause = '';
  let params:(string | number)[] = [eventFilter.range.from, eventFilter.range.to];

  if (eventFilter.filters.places?.length >0){
    params = [...params,...eventFilter.filters.places];
    const placesClause = Array.from({length:eventFilter.filters.places.length}).fill('?').join(',');
    whereClause += ` AND e.place_id IN (${placesClause})`;
  };

  if (eventFilter.filters.arts?.length > 0){
    params = [...params,...eventFilter.filters.arts];
    const artsClause = Array.from({length:eventFilter.filters.arts.length}).fill('?').join(',');
    whereClause += ` AND a.id IN (${artsClause}) `;
  };

  const sql = `   SELECT e.id, e.event_day as day, p.city, p.spot, u.nick, a.name as art, u.image 
                    FROM events as e 
                    LEFT JOIN users as u ON e.user_id = u.id
                    LEFT JOIN places as p ON e.place_id = p.id
                    LEFT JOIN arts as a ON u.art = a.id
                    WHERE e.checked = 1 
                    AND e.event_day BETWEEN ? AND ?
                    ${whereClause}
                    ORDER BY e.event_day`;
  db.query<IEventReduced[] & RowDataPacket[]>(sql,params, (err, res) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    } else if (res.length > 0) {
      return callback(null, res);
    } else {
      return callback(err, null);
    }
  });
};
