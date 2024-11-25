import {
  startOfMonth,
  getMonth,
  getYear,
  endOfMonth,
  getDay,
  eachDayOfInterval,
  isWithinInterval,
  isEqual,
  addDays,
  endOfISOWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { Button, IconButton } from "../button/button";
import "./calendar.css";
import { IEventReduced } from "../../../types/events";
import { ButtonGroup } from "../buttonGroup/buttonGroup";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const today = new Date();
const months = [
  "Leden",
  "Únor",
  "Březen",
  "Duben",
  "Květen",
  "Červen",
  "Červenec",
  "Srpen",
  "Září",
  "Říjen",
  "Listopad",
  "Prosinec",
];

const days = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

const dayNum = [6, 0, 1, 2, 3, 4, 5];

function getLocaleDay(date: Date) {
  return dayNum[getDay(date)];
}

function getDaysArray(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(new Date(year, month, 1));

  return eachDayOfInterval({ start, end });
}

function setToMidnight(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function isInRange(currDay: Date, { from, to }: DateRange): boolean {
  const normalizedCurrDay = setToMidnight(currDay);
  if (!from) return false;

  const normalizedFrom = setToMidnight(from);
  const normalizedTo = to ? setToMidnight(to) : undefined;

  if (normalizedTo) {
    return isWithinInterval(normalizedCurrDay, {
      start: normalizedFrom,
      end: normalizedTo,
    });
  }
  return false;
}

function isTerminal(currDay: Date, { from, to }: DateRange): boolean {
  if (from && isEqual(setToMidnight(currDay), setToMidnight(from))) return true;
  if (to && isEqual(setToMidnight(currDay), setToMidnight(to))) return true;
  return false;
}

type DateRange = {
  from?: Date;
  to?: Date;
};

type CalendarProps = {
  returnRange: (range: { from: Date; to: Date }) => void;
  events?: Date[];
  defaultRange?:DateRange,
};

export function Calendar({ returnRange, events,defaultRange }: CalendarProps) {
  const [currMonth, setCurrMonth] = useState(defaultRange?.from ? getMonth(defaultRange.from) : getMonth(today));
  const [currYear, setCurrYear] = useState(getYear(today));
  const [currDays, setCurrDays] = useState(getDaysArray(currYear, currMonth));
  const [dateRange, setDateRange] = useState<DateRange>(defaultRange?? {
    from: new Date(),
    to: endOfMonth(new Date()),
  });
  const [hovered, setHovered] = useState<Date>();

  const handleMonthChange = (direction: 1 | -1) => {
    if (currMonth + direction < 0) {
      setCurrMonth(11);
      setCurrYear((prev) => prev - 1);
    } else if (currMonth + direction > 11) {
      setCurrMonth(0);
      setCurrYear((prev) => prev + 1);
    } else {
      setCurrMonth((prev) => prev + direction);
    }
  };

  useEffect(() => {
    setCurrDays(getDaysArray(currYear, currMonth));
  }, [currMonth]);

  const handleDayClick = (day: Date) => {
    setDateRange((prevRange) => {
      if (prevRange.to) {
        return { from: day, to: undefined };
      } else if (!prevRange.from) {
        return { from: day, to: undefined };
      } else {
        return { ...prevRange, to: day };
      }
    });
  };

  useEffect(() => {
    if (dateRange.from && dateRange.to && dateRange.to < dateRange.from) {
      setDateRange({
        from: dateRange.to,
        to: dateRange.from,
      });
      if (dateRange.from && dateRange.to)
        returnRange({ from: setToMidnight(dateRange.to), to: setToMidnight(dateRange.from) });
    }

    if (dateRange.from && dateRange.to)
      returnRange({ from: dateRange.from, to: dateRange.to });
  }, [dateRange]);

  const updateDateRangeAndMonth = (from: Date, to: Date) => {
    setDateRange({ from, to });
    setCurrMonth(getMonth(from));
    setCurrYear(getYear(from));
  };

  return (
    <div className="calendar">
      <div className="calendar__header flex g-32 content-center items-center">
        <IconButton variant='primary' onClick={() => handleMonthChange(-1)}>
          <IoArrowBackOutline/>
        </IconButton>
        <span className="tx-lg xbold">
          {months[currMonth]} {currYear}
        </span>
        <IconButton variant='primary' onClick={() => handleMonthChange(1)}>
          <IoArrowForwardOutline/>
        </IconButton>
      </div>
      <div className="cal__grid">
        {Array.from({ length: 7 }).map((_, dayindex) => (
          <div className="cal--day flex items-center content-center day--name" key={days[dayindex]}>
            {days[dayindex]}
          </div>
        ))}
        {Array.from({
          length: getLocaleDay(startOfMonth(new Date(currYear, currMonth))),
        }).map((_, previndex) => (
          <span className="cal--day flex items-center content-center pn--day" key={'prevDay'+previndex}></span>
        ))}
        {currDays.map((currDay, currindex) => (
          <span
            className={`cal--day flex items-center content-center this--day ${
              isInRange(currDay, dateRange) ||
              (isInRange(currDay, { from: dateRange.from, to: hovered }) &&
                !dateRange.to)
                ? "day-in-range"
                : ""
            } ${isTerminal(currDay, dateRange) ? "terminal--day" : ""}
            ${events &&
                events.findIndex((event) => isEqual(new Date(event), currDay)) > -1 ? 'has--event': '' }
            `}
            onClick={() => handleDayClick(currDay)}
            onMouseOver={() => setHovered(currDay)}
            key={'thisDay'+currindex}
          >
            {currDay.getDate()}.
          </span>
        ))}
        {Array.from({
          length: 6 - getLocaleDay(endOfMonth(new Date(currYear, currMonth))),
        }).map((_, nextindex) => (
          <span className="cal--day flex items-center content-center pn--day" key={'nextDay'+nextindex}></span>
        ))}
      </div>
      <ButtonGroup className="mt-16">
        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => updateDateRangeAndMonth(new Date(), new Date())}
        >
          Dnes
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const nextDay = addDays(new Date(), 1);
            updateDateRangeAndMonth(nextDay, nextDay);
          }}
        >
          Zítra
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const today = new Date();
            updateDateRangeAndMonth(today, endOfISOWeek(today));
          }}
        >
          Tento týden
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const nextWeekStart = addDays(endOfISOWeek(new Date()), 1);
            const nextWeekEnd = addDays(nextWeekStart, 6);
            updateDateRangeAndMonth(nextWeekStart, nextWeekEnd);
          }}
        >
          Příští týden
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const today = new Date();
            updateDateRangeAndMonth(today, endOfMonth(today));
          }}
        >
          Tento měsíc
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const nextMonthStart = addDays(endOfMonth(new Date()), 1);
            const nextMonthEnd = endOfMonth(nextMonthStart);
            updateDateRangeAndMonth(nextMonthStart, nextMonthEnd);
          }}
        >
          Příští měsíc
        </Button>
      </ButtonGroup>
    </div>
  );
}
