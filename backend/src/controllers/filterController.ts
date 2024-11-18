import { Response,Request } from "express";
import { getPlacesModdel, getArtsModel } from "../models/filterModel";

export const getPlaces = (req:Request,res:Response) => {
    getPlacesModdel((err,results)=>{
        if(err) {
            return res.status(500).json({message:'Chyba při získávání míst.'})
        } 
        return res.status(200).json(results);
    });
};

export const getArts = (req:Request,res:Response) => {
    getArtsModel((err,results)=>{
        if(err) {
            return res.status(500).json({message:'Chyba při získávání umění.'})
        } 
        return res.status(200).json(results);
    });
};