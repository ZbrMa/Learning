import express from 'express';
import { createPlace, deletePlace, getAllPlaces, updatePlace } from '../controllers/placeController';

const router = express.Router();

router.get('/getAdminPlaces',getAllPlaces);
router.post('/createPlace',createPlace);
router.post('/updatePlace',updatePlace);
router.post('/deletePlace',deletePlace);

export default router;