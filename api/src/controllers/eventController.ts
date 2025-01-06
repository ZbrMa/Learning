import { Response,Request } from "express";
import { adminEventsModel, deleteEventModel, eventDetailModel, filteredEvents, newEventModel, newEventRepeatModel, upcomingEvents, eventDatesModel, loginEventModel, signOutEventModel, userEventsModel, editEventModel } from "../models/eventModel";
import { IEventDateRangeFilter, IEventFilter } from "../types/filterTypes";

export const getEventDetil = (req: Request, res: Response) => {
  eventDetailModel(req.body.id,(err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Chyba při načítání eventu" });
    }

    return res.status(200).json(response);
  });
};

export const getEventDates = (req: Request, res: Response) => {
  eventDatesModel(req.body.checked,(err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Chyba při načítání datumů" });
    }

    return res.status(200).json(response);
  });
};

export const getUpcomingEvents = (req: Request, res: Response) => {
    upcomingEvents((err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Chyba při získávání eventů" });
      }

      return res.status(200).json(response);
    });
  };

  export const postFilteredEvents = (req: Request, res: Response) => {
    const range:IEventDateRangeFilter = req.body.range;
    const filters:IEventFilter= req.body.filters;
    const checked:boolean = req.body.checked;
    filteredEvents({range,filters,checked},(err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Chyba při získávání eventů" });
      }

      return res.status(200).json(response);
    });
  };

  export const getAdminEvents = (req:Request,res:Response) => {
    adminEventsModel(req.body.from,req.body.places as number[],(err,response)=>{
      if(err) {
        return res.status(500).json({message: 'Chyba při získávání eventů.'})
      }

      return res.status(200).json(response);
    });
  };

  export const postNewEvent = (req:Request,res:Response) => {

    newEventModel(req.body,(err,response)=>{
      if(err) {
        return res.status(500).json(response)
      }

      return res.status(200).json(response);
    });
  };

  export const postRepeatEvent = (req:Request,res:Response) =>{
    newEventRepeatModel(req.body,(err,response)=>{
      if(err) {
        return res.status(500).json(response)
      }

      return res.status(200).json(response);
    });
  };

  export const deleteEevnt = (req:Request,res:Response) =>{
    deleteEventModel(req.body.id,(err,response)=>{
      if(err) {
        return res.status(500).json(response)
      }

      return res.status(200).json(response);
    });
  };

  export const postLoginEvent = (req:Request,res:Response) => {
    loginEventModel(req.body.id,req.body.userId,(err,response)=>{
      if(err) {
        return res.status(500).json(response)
      }

      return res.status(200).json(response);
    });
  };

  export const postSignOutEvent = (req:Request,res:Response)=>{
    signOutEventModel(req.body.id,(err,response)=>{
      if(err){
        return res.status(500).json(response);
      } else {
        return res.status(200).json(response);
      }
    });
  };

  export const postUserEvents = (req:Request,res:Response)=>{
    userEventsModel(req.body.userId,req.body.startDate,true,(err,response)=>{
      if(err){
        return res.status(500).json({message:'Chyba při získávání eventů.'});
      }
      
      return res.status(200).json(response);
      
    });
  };

  export const userCalendarEvents = (req:Request,res:Response)=>{
    userEventsModel(req.body.userId,req.body.startDate,false,(err,response)=>{
      if(err){
        return res.status(500).json({message:'Chyba při získávání eventů.'});
      } else {
        return res.status(200).json(response);
      }
    });
  };

  export const postEditEvent = (req:Request,res:Response)=>{
    editEventModel(req.body,(err,response)=>{
      if(err){
        return res.status(500).json(response);
      } else {
        return res.status(200).json(response);
      }
    });
  };