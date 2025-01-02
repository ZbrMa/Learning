import React, { useEffect, useState } from "react";
import {
  addWeeks,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  isSameDay,
  getWeek,
} from "date-fns";
import { cs } from "date-fns/locale";
import "./schedule.css";
import { Button, IconButton } from "../button/button";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { IEventReduced } from "../../../types/events";

const hours = Array.from({ length: 11 }, (_, i) => `${10 + i}:00`); // Hodiny od 10:00 do 20:00
const daysOfWeek = [
  "Pondělí",
  "Úterý",
  "Středa",
  "Čtvrtek",
  "Pátek",
  "Sobota",
  "Neděle",
];

type ScheduleProps = {
  events?: IEventReduced[];
  returnInterval: (start: Date) => void;
  buttonText: string;
  eventClick: (id: number) => void;
  variant?: "default" | "daysOnTop"; // Nový prop pro variantu
};

export function Schedule({
  events = [],
  returnInterval,
  buttonText,
  eventClick,
  variant = "default",
}: ScheduleProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [mobile,setMobile] = useState<string>(variant);

  const checkMobile = (width:number) => {
    if(window.innerWidth < width) {
      setMobile('daysOnTop');
    } else setMobile('default');
  };

  useEffect(()=>{
    const handleResize = () => checkMobile(768);

    window.addEventListener('resize',handleResize);

    handleResize();

    return () => window.removeEventListener('resize',handleResize);
  },[]);

  const handleWeekChange = (direction: 1 | -1) => {
    setCurrentWeekStart((prev) => addWeeks(prev, direction));
  };

  const getDaysInWeek = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  };

  useEffect(() => {
    returnInterval(currentWeekStart);
  }, [currentWeekStart]);

  const getEventsForCell = (day: Date, hour: string) => {
    return events.filter(
      (event) =>
        isSameDay(event.day, day) &&
        parseInt(event.start.split(":")[0], 10) ===
          parseInt(hour.split(":")[0], 10)
    );
  };

  return (
    <div className="schedule">
      <div className="schedule__header">
        <div className="flex g-16 items-center content-center mb-32">
          <IconButton onClick={() => handleWeekChange(-1)}>
            <IoArrowBackOutline />
          </IconButton>
          <span className="tx-lg">
            {format(currentWeekStart, "dd.MM.yyyy")} -{" "}
            {format(
              endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
              "dd.MM.yyyy"
            )}
          </span>
          <IconButton onClick={() => handleWeekChange(1)}>
            <IoArrowForwardOutline />
          </IconButton>
        </div>
      </div>

      {mobile === "default" ? (
        <div className="default__sched">
          {/* Varianta s hodinami nahoře */}
          <div className="schedule__grid-header bg-black tx-white">
            <div className="schedule--corner tx-lightGray">
              wk{" "}
              <span className="tx-white tx-md xbold">
                {getWeek(currentWeekStart)}
              </span>
            </div>
            {hours.map((hour) => (
              <div key={hour} className="schedule__hour">
                {hour}
              </div>
            ))}
          </div>
          <div className="schedule__grid">
            {getDaysInWeek().map((day) => (
              <div key={day.toISOString()} className="schedule__row">
                <div className="schedule__day bg-black tx-white">
                  {format(day, "EEEEEE", { locale: cs })}
                </div>
                {hours.map((hour) => {
                  const eventsInCell = events ? getEventsForCell(day, hour) : [];

                  return (
                    <div
                      key={`${hour}-${day}`}
                      className="schedule__cell box"
                      style={{ position: "relative" }}
                    >
                      {eventsInCell.length > 0 ? (
                        eventsInCell.map((event) => {
                          const [startHour, startMinute] = event.start.split(":").map(Number);
                          const [endHour, endMinute] = event.end.split(":").map(Number);
                  
                          const startInMinutes = startHour * 60 + startMinute;
                          const endInMinutes = endHour * 60 + endMinute;
                          const durationInMinutes = endInMinutes - startInMinutes;

                          const cellWidthPercent = 100;
                          const leftOffsetPercent = (startMinute / 60) * cellWidthPercent;
                          const widthPercent = (durationInMinutes / 60) * cellWidthPercent;
                  
                          return (
                            <div
                              key={event.id}
                              className="schedule__event"
                              style={{
                                position: "absolute",
                                left: `${leftOffsetPercent}%`,
                                top:'0',
                                width: `${widthPercent}%`,
                                height: "calc(100% - 2px)",
                                margin: "auto",
                              }}
                            >
                              {event.city}, {event.spot}
                              <div className="schedule__event--back">
                                <Button onClick={() => eventClick(event.id)}>
                                  {buttonText}
                                </Button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <span className="schedule__no-events"></span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="top-days__sched">
        {/* Varianta s dny nahoře */}
        <div className="schedule__grid-header bg-black tx-white">
          <div className="schedule--corner tx-lightGray">
            wk{" "}
            <span className="tx-white tx-md xbold">
              {getWeek(currentWeekStart)}
            </span>
          </div>
          {getDaysInWeek().map((day) => (
            <div key={day.toISOString()} className="schedule__day tx-white">
              {format(day, "EEEEEE", { locale: cs })}
            </div>
          ))}
        </div>
        <div className="schedule__grid">
          {hours.map((hour) => (
            <div key={hour} className="schedule__row">
              <div className="schedule__hour bg-black tx-white">{hour}</div>
              {getDaysInWeek().map((day) => {
                const eventsInCell = events ? getEventsForCell(day, hour) : [];

                return (
                  <div
                    key={`${hour}-${day}`}
                    className="schedule__cell box"
                    style={{ position: "relative" }}
                  >
                    {eventsInCell.length > 0 ? (
                      eventsInCell.map((event) => {
                        const [startHour, startMinute] = event.start.split(":").map(Number);
                        const [endHour, endMinute] = event.end.split(":").map(Number);
                
                        const startInMinutes = startHour * 60 + startMinute;
                        const endInMinutes = endHour * 60 + endMinute;
                        const durationInMinutes = endInMinutes - startInMinutes;
                
                        const cellHeightPercent = 100;
                        const topOffsetPercent = (startMinute / 60) * cellHeightPercent;
                        const heightPercent = (durationInMinutes / 60) * cellHeightPercent;
                
                        return (
                          <div
                            key={event.id}
                            className="schedule__event"
                            style={{
                              position: "absolute",
                              top: `${topOffsetPercent}%`,
                              height: `${heightPercent}%`,
                              width: `calc(100% - 2px)`,
                              margin: "auto",
                            }}
                          >
                            {event.city}, {event.spot}
                            <div className="schedule__event--back">
                              <Button onClick={() => eventClick(event.id)}>
                                {buttonText}
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <span className="schedule__no-events"></span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
