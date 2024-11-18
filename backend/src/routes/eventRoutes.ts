import express from 'express';
import { getUpcomingEvents, postFilteredEvents } from '../controllers/eventController';

const router = express.Router();

router.get('/up_events', getUpcomingEvents);
router.post('/filter_events', postFilteredEvents);

export default router;