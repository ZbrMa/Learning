import { IEvent } from "../../types/types";
import { EventCard } from "./card";
import './styles/eventsGrid.css';

type Props = {
    dataSet:IEvent[] | null,
}

export function EventsGrid({dataSet}:Props) {

    return (
        <div className="event-grid">
            {dataSet ? (
                dataSet.map((key,index:number)=>
                    <EventCard input={key}></EventCard>
                )
            ):(
                <div>Žádné události</div>
            )}            
        </div>
    );
}