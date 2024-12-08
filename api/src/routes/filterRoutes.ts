import express from 'express';
import { getPlaces, getArts, getCountries } from '../controllers/filterController';

const filterRouter = express.Router();

filterRouter.get('/places', getPlaces);
filterRouter.get('/arts', getArts);
filterRouter.get('/countries', getCountries);

export default filterRouter;