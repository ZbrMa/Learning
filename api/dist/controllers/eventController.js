"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEditEvent = exports.userCalendarEvents = exports.postUserEvents = exports.postSignOutEvent = exports.postLoginEvent = exports.deleteEevnt = exports.postRepeatEvent = exports.postNewEvent = exports.getAdminEvents = exports.postFilteredEvents = exports.getUpcomingEvents = exports.getEventDates = exports.getEventDetil = void 0;
const eventModel_1 = require("../models/eventModel");
const getEventDetil = (req, res) => {
    (0, eventModel_1.eventDetailModel)(req.body.id, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Chyba při načítání eventu" });
        }
        return res.status(200).json(response);
    });
};
exports.getEventDetil = getEventDetil;
const getEventDates = (req, res) => {
    (0, eventModel_1.eventDatesModel)(req.body.checked, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Chyba při načítání datumů" });
        }
        return res.status(200).json(response);
    });
};
exports.getEventDates = getEventDates;
const getUpcomingEvents = (req, res) => {
    (0, eventModel_1.upcomingEvents)((err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Chyba při získávání eventů" });
        }
        return res.status(200).json(response);
    });
};
exports.getUpcomingEvents = getUpcomingEvents;
const postFilteredEvents = (req, res) => {
    const range = req.body.range;
    const filters = req.body.filters;
    const checked = req.body.checked;
    (0, eventModel_1.filteredEvents)({ range, filters, checked }, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Chyba při získávání eventů" });
        }
        return res.status(200).json(response);
    });
};
exports.postFilteredEvents = postFilteredEvents;
const getAdminEvents = (req, res) => {
    (0, eventModel_1.adminEventsModel)((err, response) => {
        if (err) {
            return res.status(500).json({ message: 'Chyba při získávání eventů.' });
        }
        return res.status(200).json(response);
    });
};
exports.getAdminEvents = getAdminEvents;
const postNewEvent = (req, res) => {
    (0, eventModel_1.newEventModel)(req.body, (err, response) => {
        if (err) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
    });
};
exports.postNewEvent = postNewEvent;
const postRepeatEvent = (req, res) => {
    (0, eventModel_1.newEventRepeatModel)(req.body, (err, response) => {
        if (err) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
    });
};
exports.postRepeatEvent = postRepeatEvent;
const deleteEevnt = (req, res) => {
    (0, eventModel_1.deleteEventModel)(req.body.id, (err, response) => {
        if (err) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
    });
};
exports.deleteEevnt = deleteEevnt;
const postLoginEvent = (req, res) => {
    (0, eventModel_1.loginEventModel)(req.body.id, req.body.userId, (err, response) => {
        if (err) {
            return res.status(500).json(response);
        }
        return res.status(200).json(response);
    });
};
exports.postLoginEvent = postLoginEvent;
const postSignOutEvent = (req, res) => {
    (0, eventModel_1.signOutEventModel)(req.body.id, (err, response) => {
        if (err) {
            return res.status(500).json(response);
        }
        else {
            return res.status(200).json(response);
        }
    });
};
exports.postSignOutEvent = postSignOutEvent;
const postUserEvents = (req, res) => {
    (0, eventModel_1.userEventsModel)(req.body.userId, req.body.startDate, true, (err, response) => {
        if (err) {
            return res.status(500).json({ message: 'Chyba při získávání eventů.' });
        }
        return res.status(200).json(response);
    });
};
exports.postUserEvents = postUserEvents;
const userCalendarEvents = (req, res) => {
    (0, eventModel_1.userEventsModel)(req.body.userId, req.body.startDate, false, (err, response) => {
        if (err) {
            return res.status(500).json({ message: 'Chyba při získávání eventů.' });
        }
        else {
            return res.status(200).json(response);
        }
    });
};
exports.userCalendarEvents = userCalendarEvents;
const postEditEvent = (req, res) => {
    (0, eventModel_1.editEventModel)(req.body, (err, response) => {
        if (err) {
            return res.status(500).json(response);
        }
        else {
            return res.status(200).json(response);
        }
    });
};
exports.postEditEvent = postEditEvent;
