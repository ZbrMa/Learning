import { IEvent, IEventReduced } from "../../../types/events";
import { SmallEventCard } from "../../components/smallEventCard/smallEventCard";
import { Spinner } from "../../components/spinner/spinner";
import { BodyBlock } from "../bodyBlock/bodyBlock";

type EventGridProps = {
  events: IEvent[] | undefined;
  loading: boolean;
};

export function EventsGridBlock({ events, loading }: EventGridProps) {
  return (
    <BodyBlock title="Události">
      <div className="grid-3 g-64 relative">
        {loading ? (
          <Spinner fixed={false}/>
        ) : (
          events ? (
            events.map((event, index) => (
              <SmallEventCard
                event={event}
                key={"eventCard" + String(event.id) + index}
                square
              />
            ))
          ):(
            <span>Žádné události...</span>
          )
          
        )}
      </div>
    </BodyBlock>
  );
}
