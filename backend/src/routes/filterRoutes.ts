import express from 'express';
import { getPlaces, getArts } from '../controllers/filterController';

const router = express.Router();

router.get('/places', getPlaces);
router.get('/arts', getArts);

export default router;