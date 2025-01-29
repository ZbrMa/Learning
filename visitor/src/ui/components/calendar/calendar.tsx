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
  startOfWeek,
  format
} from "date-fns";
import { cs, enUS, de } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Button, IconButton } from "../button/button";
import "./calendar.css";
import { ButtonGroup } from "../buttonGroup/buttonGroup";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Spinner } from "../spinner/spinner";

const today = new Date();
const dayNum = [6, 0, 1, 2, 3, 4, 5];

const locales = {
  cs: cs,
  de: de,
  en: enUS,
}

function getLocaleDay(date: Date) {
  return dayNum[getDay(date)];
};

function getDaysArray(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(new Date(year, month, 1));

  return eachDayOfInterval({ start, end });
};

function setToMidnight(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

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
};

function isTerminal(currDay: Date, { from, to }: DateRange): boolean {
  if (from && isEqual(setToMidnight(currDay), setToMidnight(from))) return true;
  if (to && isEqual(setToMidnight(currDay), setToMidnight(to))) return true;
  return false;
};

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
  const { i18n ,t } = useTranslation('common');
  const currentLocale = locales[i18n.language as keyof typeof locales];

  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2023, i, 1), "LLLL", { locale: currentLocale })
  );
  const days = Array.from({ length: 7 }, (_, i) =>
    format(
      addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i),
      "eeeeee",
      { locale: currentLocale }
    )
  );

  const [loading,setLoading] = useState(false);
  const [currMonth, setCurrMonth] = useState(defaultRange?.from ? getMonth(defaultRange.from) : getMonth(today));
  const [currYear, setCurrYear] = useState(getYear(today));
  const [currDays, setCurrDays] = useState(getDaysArray(currYear, currMonth));
  const [dateRange, setDateRange] = useState<DateRange>(defaultRange ?? {
    from: new Date(),
    to: endOfMonth(new Date()),
  });
  const [hovered, setHovered] = useState<Date>();

  const handleMonthChange = (direction: 1 | -1) => {
    setLoading(true);
    if (currMonth + direction < 0) {
      setCurrMonth(11);
      setCurrYear((prev) => prev - 1);
    } else if (currMonth + direction > 11) {
      setCurrMonth(0);
      setCurrYear((prev) => prev + 1);
    } else {
      setCurrMonth((prev) => prev + direction);
    }

    setTimeout(()=>setLoading(false), 500)
  };

  useEffect(() => {
    setCurrDays(getDaysArray(currYear, currMonth));
  }, [currMonth,currYear]);

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
  }, [dateRange,returnRange]);

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
      {loading ? (
        <Spinner fixed={false}/>
      ):(
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
      )}
      
      <ButtonGroup className="mt-16">
        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => updateDateRangeAndMonth(new Date(), new Date())}
        >
          {t('calendar.today')}
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const nextDay = addDays(new Date(), 1);
            updateDateRangeAndMonth(nextDay, nextDay);
          }}
        >
          {t('calendar.tomorow')}
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const today = new Date();
            updateDateRangeAndMonth(today, endOfISOWeek(today));
          }}
        >
          {t('calendar.thisWeek')}
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
          {t('calendar.nextWeek')}
        </Button>

        <Button
          className="tx-xs"
          variant="ghost"
          onClick={() => {
            const today = new Date();
            updateDateRangeAndMonth(today, endOfMonth(today));
          }}
        >
          {t('calendar.thisMonth')}
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
          {t('calendar.nextMonth')}
        </Button>
      </ButtonGroup>
    </div>
  );
}