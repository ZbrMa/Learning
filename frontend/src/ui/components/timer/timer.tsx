import { HTMLAttributes, useEffect, useState } from "react"
import { ExpectedTimerFormat } from "../../../utils/timeUtils";
import { secondsToTime } from "../../../utils/timeUtils";

interface TimerProps extends HTMLAttributes<HTMLSpanElement> {
    initialTime:number,
    format:ExpectedTimerFormat
}

export function Timer({initialTime,format,...props}:TimerProps){
    const [currTime,setCurrTime] = useState(initialTime);

    useEffect(()=>{

        const timerInterval = setInterval(()=>setCurrTime(prev=>prev-1),1000);

        return ()=>clearInterval(timerInterval);
    });

    return(
        <span className="xbold tx-lg" {...props}>{secondsToTime(currTime,format)}</span>
    );
};