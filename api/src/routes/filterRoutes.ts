import express from 'express';
import { getPlaces, getArts, getCountries } from '../controllers/filterController';

const router = express.Router();

router.get('/places', getPlaces);
router.get('/arts', getArts);
router.get('/countries', getCountries);

export default router;