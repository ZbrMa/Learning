import express from 'express';
import { deleteEevnt, getAdminEvents, getEventDates, getEventDetil, getUpcomingEvents, postEditEvent, postFilteredEvents,postLoginEvent,postNewEvent, postRepeatEvent, postSignOutEvent, postUserEvents } from '../controllers/eventController';

const router = express.Router();

router.get('/up_events', getUpcomingEvents);
router.post('/filter_events', postFilteredEvents);
router.get('/adminEvents',getAdminEvents);
router.post('/newEvent',postNewEvent);
router.post('/repeatEvent',postRepeatEvent);
router.post('/deleteEvent',deleteEevnt);
router.post('/eventDetail',getEventDetil);
router.post('/eventDates',getEventDates);
router.post('/loginEvent',postLoginEvent);
router.post('/signOutEvent',postSignOutEvent);
router.post('/userEvents',postUserEvents);
router.post('/editEvent',postEditEvent);

export default router;