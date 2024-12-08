import express from 'express';
import { createPlace, deletePlace, getAllPlaces, updatePlace } from '../controllers/placeController';

const placeRouter = express.Router();

placeRouter.get('/getAdminPlaces',getAllPlaces);
placeRouter.post('/createPlace',createPlace);
placeRouter.post('/updatePlace',updatePlace);
placeRouter.post('/deletePlace',deletePlace);

export default placeRouter;