import { QueryResult, RowDataPacket } from "mysql2";
import { db } from "../controllers/database";
import { IAdminEvent, IEventReduced, INewEvent, IRepeatEvent, IEvent } from "../types/eventTypes";
import { format } from "date-fns";
import { IEventDateRangeFilter, IEventFilter } from "../types/filterTypes";
import { generateIntervals } from "../utils/dateUtils";

export const eventDetailModel = (
  eventId:number,
  callback: (err: Error | null, results: IEvent | null) => void
) => {
  const sql = `SELECT e.id, e.event_day as day, e.event_time as time, p.city, p.spot, a.name as art, u.nick, u.id as artistId, c.name,u.description as about, u.website, u.facebook, u.instagram, u.twitter, u.image
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
              LEFT JOIN users u ON e.user_id = u.id
              LEFT JOIN arts a ON u.art = a.id 
              LEFT JOIN countries c ON u.country = c.id
              WHERE e.id = ?`

              db.query<IEvent[] & RowDataPacket[]>(sql, eventId, (err, res) => {
                if (err) {
                  return callback(err, null);
                } else if (res.length === 0) {
                  return callback(null, null);
                } else {
                  return callback(null, res[0]);
                }
              });
};

export const upcomingEvents = (
  callback: (err: Error | null, results: IEventReduced[] | null) => void
) => {
  const sql = `   SELECT e.id, e.event_day as day, e.event_time as time, p.city, p.spot, a.name as art, u.nick, u.id as artistId,c.name, u.description as about, c.name, u.website, u.facebook, u.instagram, u.twitter, u.image
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
              LEFT JOIN users u ON e.user_id = u.id
              LEFT JOIN arts a ON u.art = a.id 
              LEFT JOIN countries c ON u.country = c.id
                    WHERE e.user_id IS NOT NULL 
                    AND e.event_day BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY
                    ORDER BY e.event_day LIMIT 8`;
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
  eventFilter:{range:IEventDateRangeFilter,filters:IEventFilter,checked:boolean},
  callback: (err: Error | null, results: IEvent[] | null) => void
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

  const sql = `   SELECT e.id, e.event_day as day, e.event_time as time, p.city, p.spot, a.name as art, u.nick, u.id as artistId,c.name,u.description as about, c.name, u.website, u.facebook, u.instagram, u.twitter, u.image
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
              LEFT JOIN users u ON e.user_id = u.id
              LEFT JOIN arts a ON u.art = a.id 
              LEFT JOIN countries c ON u.country = c.id
                    WHERE e.user_id IS ${eventFilter.checked ? 'NOT': ''} NULL 
                    AND e.event_day BETWEEN ? AND ?
                    ${whereClause}
                    ORDER BY e.event_day, e.event_time`;
  db.query<IEvent[] & RowDataPacket[]>(sql,params, (err, res) => {
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

export const adminEventsModel = (callback:(err:Error |null, response:IAdminEvent[] |null)=>void) => {
  const sql = 'SELECT e.id as id, e.event_day as day, e.event_time as time, e.user_id as user, p.city, p.spot FROM events e LEFT JOIN places p ON e.place_id = p.id ORDER BY e.event_day';

  db.query<IAdminEvent[] & RowDataPacket[]>(sql,(err,res)=>{
    if(err){
      return callback(err,null);
    } else if ( res.length>0){
      return callback(null,res);
    } else {
      return callback(null,null);
    }
  });
};

export const eventDatesModel = (checked:boolean,callback:(err:Error |null, response:Date[] |null)=>void) => {
  let sql = 'SELECT DISTINCT event_day FROM events WHERE event_day >= CURDATE()';

  let whereClause = checked
    ? ' AND user_id IS NOT NULL'
    : ' AND user_id IS NULL';

  sql = sql + whereClause;

  db.query<{event_day:Date}[] & RowDataPacket[]>(sql,(err,res)=>{
    if(err){
      return callback(err,null);
    } else if ( res.length>0){
      const dates: Date[] = res.map(row => new Date(row.event_day));
      return callback(null,dates);
    } else {
      return callback(null,null);
    }
  });
};

export const newEventModel = (newEvent:INewEvent,callback:(err:Error | null, response:{success:boolean,message:string})=>void) => {
  const sql = 'INSERT INTO events (event_day,event_time,place_id) VALUES (?,?,?);';
  const params = [newEvent.day,newEvent.time,newEvent.place];

  db.query(sql,params,(err,res)=>{
    if(err){
      return callback(err,{success:false,message:'Chyba při vytváření termínu.'});
    } else {
      callback(null,{success:true,message:'Nový termín byl vytvořen.'})
    }
  });

};

export const newEventRepeatModel = (newRepeat:IRepeatEvent,callback:(err:Error | null,response:{success:boolean,message:string})=>void) => {
  const {period,interval,time,place} = newRepeat;
  const dates = generateIntervals(period.start,period.end,interval);
  const sql = 'INSERT IGNORE INTO events (event_day,event_time,place_id) VALUES ?';
  
  const params = dates.map(date => [date, time, place]);

  db.query(sql,[params],(err,res)=>{
    if(err){
      return callback(err,{success:false,message:'Nepodařilo se vložit záznamy.'});
    } else {
      return callback(null,{success:true,message:'Záznamy byly úspěšně uloženy.'});
    }
  });

};

export const deleteEventModel = (id:number,callback:(err:Error | null,response:boolean)=>void) => {
  const sql = 'DELETE FROM events WHERE id = ?';

  db.query(sql,id,(err,res)=>{
    if(err){
      return callback(err,false);
    } else {
      return callback(null,true);
    }
  });

};

export const loginEventModel = (
  id: number,
  userId: number,
  callback: (err: Error | null, response: { success: boolean; message: string }) => void
) => {
  const checkEventSql = 'SELECT event_day, event_time FROM events WHERE id = ?';

  const conflictCheckSql = `
    SELECT id 
    FROM events 
    WHERE user_id = ? AND event_day = ? AND event_time = ?
  `;

  const updateSql = 'UPDATE events SET user_id = ? WHERE id = ?';

  db.query(checkEventSql, [id], (err, res) => {
    if (err) {
      return callback(err, { success: false, message: 'Chyba při přihlašování.' });
    }

    const eventDetails = res as RowDataPacket[];

    if (eventDetails.length === 0) {
      return callback(null, { success: false, message: 'Událost nenalezena.' });
    }

    const { event_day, event_time } = eventDetails[0];

    db.query(conflictCheckSql, [userId, event_day, event_time], (err, conflictRes) => {
      if (err) {
        return callback(err, { success: false, message: 'Chyba při kontrole konfliktu.' });
      }

      const conflicts = conflictRes as RowDataPacket[];

      if (conflicts.length > 0) {
        return callback(null, { success: false, message: 'Nemůžeš být na dvou místech zároveň. :)' });
      }

      db.query(updateSql, [userId, id], (err) => {
        if (err) {
          return callback(err, { success: false, message: 'Chyba při přihlašování.' });
        }

        return callback(null, { success: true, message: 'Úspěšně zabookováno.' });
      });
    });
  });
};

export const signOutEventModel = (id:number,callback:(err:Error | null, response:{ success: boolean; message: string })=>void) => {
  const sql = 'UPDATE events SET user_id = NULL WHERE id = ?';

  db.query(sql,id,(err,res)=>{
    if(err){
      return callback(err,{success:false,message:'Chyba při odhlašování z termínu.'});
    } else {
      return callback(null,{success:true,message:'Úspěšně odhlášeno.'});
    }
  });
};


export const userEventsModel = (
  userId:number,
  callback: (err: Error | null, results: IEventReduced[] | null) => void
) => {
  const sql = `   SELECT e.id, e.event_day as day, e.event_time as time, p.city, p.spot
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
                    WHERE e.user_id = ?  
                    AND e.event_day >= CURDATE()
                    ORDER BY e.event_day, e.event_time`;
  db.query<IEventReduced[] & RowDataPacket[]>(sql,userId, (err, res) => {
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