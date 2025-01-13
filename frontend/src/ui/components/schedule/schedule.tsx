import React, { useEffect, useState, memo, useMemo } from "react";
import {
  addWeeks,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  isSameDay,
  getWeek,
  isBefore,
  parse,
  compareAsc
} from "date-fns";
import { cs, de, enUS } from "date-fns/locale";
import "./schedule.css";
import { Button, IconButton } from "../button/button";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { IEventReduced } from "../../../types/events";
import { Spinner } from "../spinner/spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";

const hours = Array.from({ length: 11 }, (_, i) => `${10 + i}:00`); // Hodiny od 10:00 do 20:00

const locales = {
  cs: cs,
  en: enUS,
  de: de,
};

type ScheduleProps = {
  events?: IEventReduced[];
  returnInterval?: (start: Date) => void;
  buttonText: string;
  eventClick: (id: number) => void;
  variant?: "default" | "daysOnTop";
  isAdmin?:boolean;
  hasFilter?:boolean;
  isLoading?:boolean;
};

export const Schedule = memo(function Schedule({
  events = [],
  returnInterval,
  buttonText,
  eventClick,
  variant = "default",
  isAdmin=false,
  hasFilter=true,
  isLoading=false,
}: ScheduleProps) {
  const { lang } = useSelector((root: RootState) => root.lang);
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

  const getDaysInWeek = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  useEffect(() => {
    returnInterval && returnInterval(currentWeekStart);
  }, [currentWeekStart, returnInterval]);

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
      {isLoading && <Spinner/>}
      {hasFilter &&
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
      }

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
            {getDaysInWeek.map((day) => (
              <div key={day.toISOString()} className="schedule__row">
                <div className="schedule__day tx-white px-8">
                  <span className="tx-xs mr-8">{format(day, "EEEEEE", { locale: locales[lang] })}</span>
                  <span className="xbold">{format(day,'dd.MM.',{locale:locales[lang]})}</span>
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
                            //outer container
                            <div
                              key={event.id}
                              className={`schedule__event p-4 box ${isAdmin? 'admin':''} ${!isAdmin? 'occupied' : ''} ${
                                !isBefore(new Date(), parse(event.end, 'HH:mm:ss', event.day)) ? 'old' : ''}`}
                              style={{
                                position: "absolute",
                                left: `${leftOffsetPercent}%`,
                                top:'0',
                                width: `${widthPercent}%`,
                                height: "calc(100% - 2px)",
                                margin: "auto",
                              }}
                            > 
                            {/*inner content*/}
                            <div className="relative event__inner flex box items-center">
                              {
                                  isBefore(new Date(), parse(event.end, 'HH:mm:ss', event.day)) &&
                                <Button onClick={() => eventClick(event.id)}>
                                        {buttonText}
                                </Button>
                              }
                              <span className="event-rect"></span>
                              <div className="w-full">
                                {/* Dynamický obsah na základě podmínek */}
                                <p className="text-left bold event--place">
                                  {isAdmin 
                                    ? (event.nick ? event.nick : "?") 
                                    : `${event.spot}`}
                                </p>
                                <p className="mb-4 text-left">
                                  {event.start.split(":").slice(0, 2).join(":")} - {event.end.split(":").slice(0, 2).join(":")}
                                </p>
                              </div>
                            </div>
                              {/*!(compareAsc(new Date(event.day), new Date()) === -1 &&
                                !isBefore(new Date(), parse(event.end, 'HH:mm:ss', event.day))) &&
                                
                                <div className="schedule__event--back">
                                  <div className="schedule__event--back__inner relative">
                                    <Button onClick={() => eventClick(event.id)}>
                                      {buttonText}
                                    </Button>
                                </div>
                              </div>*/}
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
          {getDaysInWeek.map((day) => (
            <div className="schedule__day tx-white px-8">
              <span className="tx-xs mr-8">{format(day, "EEEEEE", { locale: locales[lang] })}</span>
              <span className="xbold">{format(day,'dd.MM.',{locale:locales[lang]})}</span>
          </div>
          ))}
        </div>
        <div className="schedule__grid">
          {hours.map((hour) => (
            <div key={hour} className="schedule__row">
              <div className="schedule__hour bg-black tx-white">{hour}</div>
              {getDaysInWeek.map((day) => {
                const eventsInCell = events ? getEventsForCell(day, hour) : [];

                return (
                  <div
                    key={`${hour}-${day}`}
                    className="schedule__cell box"
                    style={{ position: "relative" }}
                  >
                    {eventsInCell.length > 0 ? (
                      eventsInCell.map((event) => {                
                        const cellHeightPercent = 100;

                        const [startHour, startMinute] = event.start.split(":").map(Number);
                        const [endHour, endMinute] = event.end.split(":").map(Number);
                  
                        const startInMinutes = startHour * 60 + startMinute;
                        const endInMinutes = endHour * 60 + endMinute;
                        const durationInMinutes = endInMinutes - startInMinutes;

                          const cellWidthPercent = 100;
                          const topOffsetPercent = (startMinute / 60) * cellHeightPercent;
                          const heightPercent = (durationInMinutes / 60) * cellHeightPercent;
                
                        return (
                          //outer container
                          <div
                            key={event.id}
                            className={`schedule__event p-4 box ${isAdmin? 'admin':''} ${!isAdmin? 'occupied' : ''} ${
                              !isBefore(new Date(), parse(event.end, 'HH:mm:ss', event.day)) ? 'old' : ''}`}
                            style={{
                              position: "absolute",
                              top: `${topOffsetPercent}%`,
                              height: `${heightPercent}%`,
                              width: "calc(100% - 2px)",
                              margin: "auto",
                            }}
                          > 
                          {/*inner content*/}
                          <div className="relative event__inner flex box items-center">
                            {
                                isBefore(new Date(), parse(event.end, 'HH:mm:ss', event.day)) &&
                              <Button onClick={() => eventClick(event.id)}>
                                      {buttonText}
                              </Button>
                            }
                            <span className="event-rect"></span>
                            <div className="w-full">
                              {/* Dynamický obsah na základě podmínek */}
                              <p className="text-left bold event--place">
                                {isAdmin 
                                  ? (event.nick ? event.nick : "?") 
                                  : `${event.spot}`}
                              </p>
                              <p className="mb-4 text-left">
                                {event.start.split(":").slice(0, 2).join(":")} - {event.end.split(":").slice(0, 2).join(":")}
                              </p>
                            </div>
                          </div>
                            {/*!(compareAsc(new Date(event.day), new Date()) === -1 &&
                              !isBefore(new Date(), parse(event.end, 'HH:mm:ss', event.day))) &&
                              
                              <div className="schedule__event--back">
                                <div className="schedule__event--back__inner relative">
                                  <Button onClick={() => eventClick(event.id)}>
                                    {buttonText}
                                  </Button>
                              </div>
                            </div>*/}
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
});
