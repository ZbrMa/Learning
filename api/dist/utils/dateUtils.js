"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIntervals = generateIntervals;
function generateIntervals(startDate, endDate, interval) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let dates = [];
    start.setDate(start.getDate());
    end.setDate(end.getDate() + 1);
    while (start <= end) {
        dates.push(start.toISOString().split('T')[0]);
        start.setDate(start.getDate() + interval);
    }
    return dates;
}
;
