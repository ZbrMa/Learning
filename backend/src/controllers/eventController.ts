import { Response,Request } from "express";
import { filteredEvents, upcomingEvents } from "../models/eventModel";
import { IEventDateRangeFilter, IEventFilter } from "../types/filterTypes";

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
    filteredEvents({range,filters},(err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Chyba při získávání eventů" });
      }

      return res.status(200).json(response);
    });
  };