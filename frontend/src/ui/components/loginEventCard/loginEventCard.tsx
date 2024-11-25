import { formatDate, format, parse } from "date-fns";
import { cs } from "date-fns/locale";
import { IEventReduced } from "../../../types/events";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import {
  useLoginEventMutation,
  useSignOutEventMutation,
} from "../../../api/eventApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/userStore";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../alert/alert";
import { Button } from "../button/button";
import "./loginEventCard.css";

type LoginEventCardProps = {
  event: IEventReduced;
  variant?: "login" | "signOut" | "no action";
};

export function LoginEventCard({
  event,
  variant = "login",
}: LoginEventCardProps) {
  const { id: userId } = useSelector((root: RootState) => root.auth);
  const { showAlert } = useAlert();
  const [loginEvent] = useLoginEventMutation();
  const [signOutEvent] = useSignOutEventMutation();

  const handleLoginSpot = async () => {
    const response = await loginEvent({ id: event.id, userId: userId });

    if (response.data) {
      if (response.data.success) {
        showAlert(<Alert type="positive">{response.data.message}</Alert>);
      } else {
        showAlert(<Alert type="negative">{response.data.message}</Alert>);
      }
    } else if (response.error) {
      showAlert(
        <Alert type="negative">Chyba serveru, zkuste to později.</Alert>
      );
    }
  };

  const handleSignOut = async () => {
    const response = await signOutEvent({ id: event.id });

    if (response.data) {
      if (response.data.success) {
        showAlert(<Alert type="positive">{response.data.message}</Alert>);
      } else {
        showAlert(<Alert type="negative">{response.data.message}</Alert>);
      }
    } else if (response.error) {
      showAlert(
        <Alert type="negative">Chyba serveru, zkuste to později.</Alert>
      );
    }
  };

  return (
    <div className="event--listed__card flex g-32 items-center">
      <div className="event--listed__date p-8 box">
        <div className="event--day tx-white h-lg xbold">
          {formatDate(event.day, "dd")}.
        </div>
        <div className="event__my grid-2 g-8">
          <span className="event--month tx-white">
            {format(event.day, "MMM", { locale: cs })}
          </span>
          <span className="event--year tx-white">
            {formatDate(event.day, "yy")}
          </span>
        </div>
      </div>
      <div>
        <span className="flex g-8 tx-md bold mb-8">
          <IoTimeOutline />{" "}
          {format(parse(event.time, "HH:mm:ss", new Date()), "HH:mm")}
        </span>
        <span className="flex g-8 tx-md bold">
          <IoLocationOutline /> {event.city}, {event.spot}
        </span>
      </div>
      {variant === "no action" ? null : variant === "login" ? (
        <Button onClick={handleLoginSpot} style={{ marginLeft: "auto" }}>
          Booknout
        </Button>
      ) : (
        <Button onClick={handleSignOut} style={{ marginLeft: "auto" }}>
          Zrušit
        </Button>
      )}
    </div>
  );
}
