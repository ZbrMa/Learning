import express from 'express';
import { deleteEevnt, getAdminEvents, getEventDates, getEventDetil, getUpcomingEvents, postEditEvent, postFilteredEvents,postLoginEvent,postNewEvent, postRepeatEvent, postSignOutEvent, postUserEvents, userCalendarEvents } from '../controllers/eventController';

const eventRouter = express.Router();

eventRouter.get('/up_events', getUpcomingEvents);
eventRouter.post('/filter_events', postFilteredEvents);
eventRouter.get('/adminEvents',getAdminEvents);
eventRouter.post('/newEvent',postNewEvent);
eventRouter.post('/repeatEvent',postRepeatEvent);
eventRouter.post('/deleteEvent',deleteEevnt);
eventRouter.post('/eventDetail',getEventDetil);
eventRouter.post('/eventDates',getEventDates);
eventRouter.post('/loginEvent',postLoginEvent);
eventRouter.post('/signOutEvent',postSignOutEvent);
eventRouter.post('/userEvents',postUserEvents);
eventRouter.post('/userCalendarEvents',userCalendarEvents);
eventRouter.post('/editEvent',postEditEvent);

export default eventRouter;