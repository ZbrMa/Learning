import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { startOfISOWeek } from "date-fns";
import { Spinner } from "../../../ui/components/spinner/spinner";
import {
  useGetUserCalendarEventsQuery,
  useSignOutEventMutation,
} from "../../../api/eventApiSlice";
import { Schedule } from "../../../ui/components/schedule/schedule";
import { Alert } from "../../../ui/components/alert/alert";
import { useAlert } from "../../../context/alertContext";
import { useTranslation } from "react-i18next";

export function UserHomeCalendar() {
    const { id } = useSelector((root: RootState) => root.auth);
    const { t:tComm } = useTranslation("common");
    const { t:tApp } = useTranslation("app");
    const {
      data: events,
      isLoading: eventsLoading,
      isFetching:eventsFetching,
    } = useGetUserCalendarEventsQuery({
      startDate: startOfISOWeek(new Date),
      userId:id
    });
    const [signOutEvent] = useSignOutEventMutation();
    const { showAlert } = useAlert();
  
    const handleSignOut = async (id: number) => {
      const response = await signOutEvent({ id: id });
  
      if (response.data) {
        if (response.data.success) {
          showAlert(<Alert type="positive">{response.data.message}</Alert>);
        } else {
          showAlert(<Alert type="negative">{response.data.message}</Alert>);
        }
      } else if (response.error) {
        showAlert(
          <Alert type="negative">{tComm("errors.server")}</Alert>
        );
      }
    };
  
    return (
      <div className="app__home__calendar">
        <h3 className="h-sm xbold mb-16">{tApp("home.thisWkEv")}</h3>
        {eventsLoading ||eventsFetching ? (
          <Spinner fixed={false} />
        ) : (
          <Schedule
            events={events}
            hasFilter={false}
            buttonText={tComm("button.cancel")}
            eventClick={handleSignOut}
            isLoading = {eventsLoading || eventsFetching}
            variant='daysOnTop'
          />
        )}
      </div>
    );
  }