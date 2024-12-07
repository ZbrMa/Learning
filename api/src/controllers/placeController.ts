import { Request, Response,NextFunction , RequestHandler} from "express";
import { createPlaceModel, deletePlaceModel, editPlaceModel, getPlacesModel } from "../models/placeModel";
import { INewPlace } from "../types/placeTypes";
import { IMessageResponse } from "../types/responseTypes";
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage }).single('image');

export const getAllPlaces = (req:Request,res:Response) =>{

    getPlacesModel((err,result)=>{
        if(err){
            res.status(500).json({message:'Při získávání měst nastala chyba'});
        } else {
            res.status(200).json(result);
        }
    });
};

export const deletePlace = (req:Request,res:Response) => {

    deletePlaceModel(req.body.id,(err,result)=>{
        if(err){
            res.status(500).json(result);
        } else {
            res.status(200).json(result);
        }
    });
};

export const updatePlace: RequestHandler = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Chyba při nahrávání souboru.' });
        }

        const place = JSON.parse(req.body.place);
        const image = req.file;

        if (isNaN(place.id)) {
            return res.status(400).json({ success: false, message: 'ID místa je neplatné.' });
        }

        const callback = (err: Error | null, result: IMessageResponse) => {
            if (err) {
                return res.status(500).json(result);
            }
            return res.status(200).json(result);
        };

        if (image) {
            editPlaceModel(place, image.buffer, image.originalname, callback);
        } else {
            editPlaceModel(place, null, null, callback);
        }
    });
};

export const createPlace: RequestHandler = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Chyba při nahrávání souboru.' });
        }

        const place = JSON.parse(req.body.place);
        const image = req.file;

        const callback = (err: Error | null, result: IMessageResponse) => {
            if (err) {
                return res.status(500).json(result);
            }
            return res.status(200).json(result);
        };

        image && createPlaceModel(place, image.buffer, image.originalname, callback);

    });
};