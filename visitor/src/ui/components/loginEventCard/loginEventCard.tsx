import { formatDate, format, parse } from "date-fns";
import { cs } from "date-fns/locale";
import { IEventReduced } from "../../../types/event";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import "./loginEventCard.css";

type LoginEventCardProps = {
  event: IEventReduced;
};

export function LoginEventCard({
  event
}: LoginEventCardProps) {

  return (
    <div className="event--listed__card flex g-32 items-center">
      <div className="event--listed__date p-8 box">
        <div className="event--day tx-white h-lg xbold">
          {formatDate(event.day, "dd")}.
        </div>
        <div className="event__my flex w-fit g-8">
          <span className="event--month tx-white">
            {format(event.day, "MMM", { locale: cs })}
          </span>
          <span className="event--year tx-white">
            {formatDate(event.day, "yy")}
          </span>
        </div>
      </div>
      <div>
        <span className="flex items-center g-8 tx-md bold mb-8">
          <IoTimeOutline />{" "}
          {format(parse(event.start, "HH:mm:ss", new Date()), "HH:mm")} - {format(parse(event.end, "HH:mm:ss", new Date()), "HH:mm")}
        </span>
        <span className="flex g-8 tx-md bold">
          <IoLocationOutline /> {event.city}, {event.spot}
        </span>
      </div>
    </div>
  );
}
