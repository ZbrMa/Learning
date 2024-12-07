"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEventsModel = exports.signOutEventModel = exports.loginEventModel = exports.deleteEventModel = exports.newEventRepeatModel = exports.newEventModel = exports.eventDatesModel = exports.editEventModel = exports.adminEventsModel = exports.filteredEvents = exports.upcomingEvents = exports.eventDetailModel = void 0;
const database_1 = require("../controllers/database");
const dateUtils_1 = require("../utils/dateUtils");
const eventDetailModel = (eventId, callback) => {
    const sql = `SELECT e.id, e.event_day as day, e.event_start as start, e.event_end as end, p.city, p.spot, a.name as art, u.nick, u.id as artistId, c.name,u.description as about, u.website, u.facebook, u.instagram, u.twitter, u.image
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
              LEFT JOIN users u ON e.user_id = u.id
              LEFT JOIN arts a ON u.art = a.id 
              LEFT JOIN countries c ON u.country = c.id
              WHERE e.id = ?`;
    database_1.db.query(sql, eventId, (err, res) => {
        if (err) {
            return callback(err, null);
        }
        else if (res.length === 0) {
            return callback(null, null);
        }
        else {
            return callback(null, res[0]);
        }
    });
};
exports.eventDetailModel = eventDetailModel;
const upcomingEvents = (callback) => {
    const sql = `   SELECT e.id, e.event_day as day, e.event_start as start, e.event_end as end, p.city, p.spot, a.name as art, u.nick, u.id as artistId,c.name, u.description as about, c.name, u.website, u.facebook, u.instagram, u.twitter, u.image
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
              LEFT JOIN users u ON e.user_id = u.id
              LEFT JOIN arts a ON u.art = a.id 
              LEFT JOIN countries c ON u.country = c.id
                    WHERE e.user_id IS NOT NULL 
                    AND e.event_day BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY
                    ORDER BY e.event_day LIMIT 8`;
    database_1.db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else if (res.length > 0) {
            return callback(null, res);
        }
        else {
            return callback(err, null);
        }
    });
};
exports.upcomingEvents = upcomingEvents;
const filteredEvents = (eventFilter, callback) => {
    let whereClause = '';
    let params = [eventFilter.range.from, eventFilter.range.to];
    if (eventFilter.filters.places?.length > 0) {
        params = [...params, ...eventFilter.filters.places];
        const placesClause = Array.from({ length: eventFilter.filters.places.length }).fill('?').join(',');
        whereClause += ` AND e.place_id IN (${placesClause})`;
    }
    ;
    if (eventFilter.filters.arts?.length > 0) {
        params = [...params, ...eventFilter.filters.arts];
        const artsClause = Array.from({ length: eventFilter.filters.arts.length }).fill('?').join(',');
        whereClause += ` AND a.id IN (${artsClause}) `;
    }
    ;
    const sql = `   SELECT e.id, e.event_day as day, e.event_start as start,e.event_end as end,  p.city, p.spot, a.name as art, u.nick, u.id as artistId,c.name,u.description as about, c.name, u.website, u.facebook, u.instagram, u.twitter, u.image
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
              LEFT JOIN users u ON e.user_id = u.id
              LEFT JOIN arts a ON u.art = a.id 
              LEFT JOIN countries c ON u.country = c.id
                    WHERE e.user_id IS ${eventFilter.checked ? 'NOT' : ''} NULL 
                    AND e.event_day BETWEEN ? AND ?
                    AND e.event_day >= CURDATE()
                    ${whereClause}
                    ORDER BY e.event_day, e.event_start`;
    database_1.db.query(sql, params, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else if (res.length > 0) {
            return callback(null, res);
        }
        else {
            return callback(err, null);
        }
    });
};
exports.filteredEvents = filteredEvents;
const adminEventsModel = (callback) => {
    const sql = 'SELECT e.id as id, e.event_day as day, e.event_start as start,e.event_end as end, e.user_id as user,e.place_id as placeId, p.city, p.spot FROM events e LEFT JOIN places p ON e.place_id = p.id ORDER BY e.event_day';
    database_1.db.query(sql, (err, res) => {
        if (err) {
            return callback(err, null);
        }
        else if (res.length > 0) {
            return callback(null, res);
        }
        else {
            return callback(null, null);
        }
    });
};
exports.adminEventsModel = adminEventsModel;
const editEventModel = (event, callback) => {
    console.log(event);
    const sql = "UPDATE events SET event_day = ?, event_start = ?, event_end = ? WHERE id = ?";
    database_1.db.query(sql, [event.day, event.start, event.end, event.id], (err, res) => {
        if (err) {
            return callback(err, { success: false, message: "Úprava se nezdařila." });
        }
        else {
            return callback(null, { success: true, message: "Událost byla úspěšně upravena." });
        }
    });
};
exports.editEventModel = editEventModel;
const eventDatesModel = (checked, callback) => {
    let sql = 'SELECT DISTINCT event_day FROM events WHERE event_day >= CURDATE()';
    let whereClause = checked
        ? ' AND user_id IS NOT NULL'
        : ' AND user_id IS NULL';
    sql = sql + whereClause;
    database_1.db.query(sql, (err, res) => {
        if (err) {
            return callback(err, null);
        }
        else if (res.length > 0) {
            const dates = res.map(row => new Date(row.event_day));
            return callback(null, dates);
        }
        else {
            return callback(null, null);
        }
    });
};
exports.eventDatesModel = eventDatesModel;
const newEventModel = (newEvent, callback) => {
    const sql = 'INSERT INTO events (event_day,event_start, event_end,place_id) VALUES (?,?,?);';
    const params = [newEvent.day, newEvent.start, newEvent.end, newEvent.place];
    database_1.db.query(sql, params, (err, res) => {
        if (err) {
            return callback(err, { success: false, message: 'Chyba při vytváření termínu.' });
        }
        else {
            callback(null, { success: true, message: 'Nový termín byl vytvořen.' });
        }
    });
};
exports.newEventModel = newEventModel;
const newEventRepeatModel = (newRepeat, callback) => {
    const { period, interval, start, end, place } = newRepeat;
    const dates = (0, dateUtils_1.generateIntervals)(period.start, period.end, interval);
    const sql = 'INSERT IGNORE INTO events (event_day,event_start,event_end, place_id) VALUES ?';
    const params = dates.map(date => [date, start, end, place]);
    database_1.db.query(sql, [params], (err, res) => {
        if (err) {
            return callback(err, { success: false, message: 'Nepodařilo se vložit záznamy.' });
        }
        else {
            return callback(null, { success: true, message: 'Záznamy byly úspěšně uloženy.' });
        }
    });
};
exports.newEventRepeatModel = newEventRepeatModel;
const deleteEventModel = (id, callback) => {
    const sql = 'DELETE FROM events WHERE id = ?';
    database_1.db.query(sql, id, (err, res) => {
        if (err) {
            return callback(err, false);
        }
        else {
            return callback(null, true);
        }
    });
};
exports.deleteEventModel = deleteEventModel;
const loginEventModel = (id, userId, callback) => {
    const checkEventSql = 'SELECT event_day, event_start, event_end FROM events WHERE id = ?';
    const conflictCheckSql = `
    SELECT id 
    FROM events 
    WHERE user_id = ? AND event_day = ? AND event_start = ? AND event_end = ?
  `;
    const updateSql = 'UPDATE events SET user_id = ? WHERE id = ?';
    database_1.db.query(checkEventSql, [id], (err, res) => {
        if (err) {
            return callback(err, { success: false, message: 'Chyba při přihlašování.' });
        }
        const eventDetails = res;
        if (eventDetails.length === 0) {
            return callback(null, { success: false, message: 'Událost nenalezena.' });
        }
        const { event_day, event_start, event_end } = eventDetails[0];
        database_1.db.query(conflictCheckSql, [userId, event_day, event_start, event_end], (err, conflictRes) => {
            if (err) {
                return callback(err, { success: false, message: 'Chyba při kontrole konfliktu.' });
            }
            const conflicts = conflictRes;
            if (conflicts.length > 0) {
                return callback(null, { success: false, message: 'Nemůžeš být na dvou místech zároveň. :)' });
            }
            database_1.db.query(updateSql, [userId, id], (err) => {
                if (err) {
                    return callback(err, { success: false, message: 'Chyba při přihlašování.' });
                }
                return callback(null, { success: true, message: 'Úspěšně zabookováno.' });
            });
        });
    });
};
exports.loginEventModel = loginEventModel;
const signOutEventModel = (id, callback) => {
    const sql = 'UPDATE events SET user_id = NULL WHERE id = ?';
    database_1.db.query(sql, id, (err, res) => {
        if (err) {
            return callback(err, { success: false, message: 'Chyba při odhlašování z termínu.' });
        }
        else {
            return callback(null, { success: true, message: 'Úspěšně odhlášeno.' });
        }
    });
};
exports.signOutEventModel = signOutEventModel;
const userEventsModel = (userId, startDay, allEvents, callback) => {
    const sql = `   SELECT e.id, e.event_day as day, e.event_start as start, e.event_end as end,  p.city, p.spot
              FROM events e
              LEFT JOIN places p ON e.place_id = p.id
                    WHERE e.user_id = ?  
                    AND  ${allEvents ? 'e.event_day >= ?' : 'e.event_day BETWEEN ? AND DATE_ADD(?, INTERVAL 7 DAY)'}
                    ORDER BY e.event_day, e.event_start`;
    const params = allEvents ? [userId, startDay] : [userId, startDay, startDay];
    database_1.db.query(sql, params, (err, res) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else if (res.length > 0) {
            return callback(null, res);
        }
        else {
            return callback(null, null);
        }
    });
};
exports.userEventsModel = userEventsModel;
