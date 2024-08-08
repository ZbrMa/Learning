import "react-calendar/dist/Calendar.css";
import './styles/calendar.css';
import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Button } from "./button";

const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
const monthNames = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
var today = new Date();
today.setHours(0,0,0,0);
var oneDay = 24 * 60 * 60 * 1000;
var week = 7 * oneDay;
var tomorrow = new Date(today.getTime() + oneDay);
var thisWeekEnd = new Date(today.getTime() + (7 - today.getDay()) * oneDay);
var nextWeekStart = new Date(thisWeekEnd.getTime() + oneDay);
var nextWeekEnd = new Date(thisWeekEnd.getTime() + week);
var thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
var nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
var nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0);

function weekCount(year: number, month_number: number) {
    var firstOfMonth = new Date(year, month_number, 1);
    var lastOfMonth = new Date(year, month_number + 1, 0);

    var used = firstOfMonth.getDay() + 6 + lastOfMonth.getDate();

    return Math.ceil(used / 7)-1;
}

const getMonthName = (month: number) => {
    return monthNames[month];
};

type Props = {
    returnInterval:any,
}

export function Calendar({returnInterval}:Props) {
    const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
    const [numWeeks, setNumWeeks] = useState<number>(weekCount(today.getFullYear(), today.getMonth()));
    const [startDate,setStartDate] = useState<Date | null>(null);
    const [endDate,setEndDate] = useState<Date | null>(null);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    useEffect(() => {
        setNumWeeks(weekCount(selectedYear, selectedMonth));
    }, [selectedMonth, selectedYear]);

    useEffect(()=>{
        if(startDate && endDate){ 
            endDate.setHours(23,59,59,59);
            returnInterval(startDate,endDate);
        }
    },[startDate,endDate])

    const handleMonthUp = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const handleMonthDown = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const renderRows = () => {
        let rows = [];
        let dayCounter = 1;
        const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        for (let week = 0; week < numWeeks; week++) {
            let cells = [];
            for (let day = 1; day < 8; day++) {
                const currentDate = new Date(selectedYear, selectedMonth, dayCounter);
                const isToday = dayCounter === today.getDate() && selectedMonth === today.getMonth() && selectedYear === today.getFullYear();
                const isSelectedStart = startDate && dayCounter === startDate.getDate() && selectedMonth === startDate.getMonth() && selectedYear === startDate.getFullYear();
                const isSelectedEnd = endDate && dayCounter === endDate.getDate() && selectedMonth === endDate.getMonth() && selectedYear === endDate.getFullYear();
                const isInRange = isDateInRange(currentDate);

                if (week === 0 && day < firstDayOfMonth) {
                    cells.push(<td key={day} className="day-item prev-month-day"></td>);
                } else if (dayCounter <= daysInMonth) {
                    cells.push(
                        <td
                            key={day}
                            className={`day-item ${isInRange ? 'in-range' : ''} ${isSelectedStart ? 'in-range start-day' : ''} ${isSelectedEnd ? 'end-day' : ''} ${isToday ? 'is-today' : ''}`}
                            onClick={handleIntervalSelect}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {dayCounter}
                        </td>
                    );
                    dayCounter++;
                } else {
                    cells.push(<td key={day} className="day-item next-month-day"></td>);
                }
            }
            rows.push(<tr key={week}>{cells}</tr>);
        }
        return rows;
    };

    const handleIntervalSelect = (event:any) => {
        const day = parseInt(event.target.textContent);
        if (!isNaN(day)) {
            const selectedDate = new Date(selectedYear, selectedMonth, day);
            if (startDate && !endDate) {
                if (selectedDate > startDate) {
                    setEndDate(selectedDate);
                } else {
                    setStartDate(selectedDate);
                    setEndDate(startDate);
                }
            } else {
                setStartDate(selectedDate);
                setEndDate(null);
            }
            setHoveredDate(null);
        }
    };

    const resetCalendar=()=> {
        setEndDate(null);
        setStartDate(null);
    };

    const handleMouseEnter = (event:any) => {
        const day = parseInt(event.target.textContent);
        if (!isNaN(day) && startDate && !endDate) {
            setHoveredDate(new Date(selectedYear, selectedMonth, day));
        }
    };

    const handleMouseLeave = () => {
        setHoveredDate(null);
    };

    const isDateInRange = (date:Date) => {
        if (!startDate || (!endDate && !hoveredDate)) return false;
        const end = endDate || hoveredDate;
        if (end){
            if (end < startDate){
                return date < startDate && date > end;
            }
            else {
                return date > startDate && date < end;
            }
        } 
    };

    const selectPredefined = (start:Date,end:Date) => {
        setSelectedMonth(start.getMonth());
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-nav">
                <button className="month-down" onClick={handleMonthDown}><IoChevronBack className="chevron"></IoChevronBack></button>
                <div className="current-month">{getMonthName(selectedMonth)} {selectedYear}</div>
                <button className="month-up" onClick={handleMonthUp}><IoChevronForward className="chevron"></IoChevronForward></button>
            </div>
            <table className="calendar-table">
                <thead>
                    <tr>
                        {dayNames.map((name, index) => (
                            <th key={index} className="day-name">{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
            <div className="predefined-buttons">
                <Button variant="grey" click={() =>selectPredefined(today, today)}>Dnes</Button>
                <Button variant="grey" click={() =>selectPredefined(tomorrow,tomorrow)}>Zítra</Button>
                <Button variant="grey" click={() =>selectPredefined(today, thisWeekEnd)}>Tento týden</Button>
                <Button variant="grey" click={() =>selectPredefined(nextWeekStart, nextWeekEnd)}>Příští týden</Button>
                <Button variant="grey" click={() =>selectPredefined(today, thisMonthEnd)}>Tento měsíc</Button>
                <Button variant="grey" click={() =>selectPredefined(nextMonthStart, nextMonthEnd)}>Příští měsíc</Button>
                <Button variant="grey" click={() =>resetCalendar()}>Vybrat vše</Button>
            </div>
        </div>
    );
}
