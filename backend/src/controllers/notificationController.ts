import { Request, Response} from "express";
import { getNotificationsModel, readNotificationModel, sendNewNotificationModel } from "../models/notificationModel";

//flow "from" znamená, že chci dostat uživatelem odeslané, flow "to" uživatelem přijaté
export const getIncommingNotifications = (req:Request,res:Response) => {

    getNotificationsModel('to_user',req.body.userId,(err,result)=>{
        if(err){
            return res.status(500).json({message:'Nepodařilo se získat příchozí upozornění'});
        }

        return res.status(200).json(result);
    });
};

export const getSentNotifications = (req:Request,res:Response) => {

    getNotificationsModel('from_user',req.body.userId,(err,result)=>{
        if(err){
            return res.status(500).json({message:'Nepodařilo se získat odchozí upozornění'});
        }

        return res.status(200).json(result);
    });
};

export const sendNewNotification = (req:Request,res:Response) => {
    sendNewNotificationModel(req.body.notification,req.body.userId,(err,result)=>{
        if(err){
            return res.status(500).json(result);
        }

        return res.status(200).json(result);
    });
};

export const readNotification = (req:Request,res:Response) => {
    readNotificationModel(req.body.id,(err,result)=>{
        if(err){
            return res.status(500).json({message:'Nepodařilo se aktualizovat upoznorění'});
        }

        return res.status(200).json(result);
    });
};