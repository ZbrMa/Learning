import { UserDashboard } from "./userDashboard";
import {
  useGetFilteredEventsQuery,
  useLoginEventMutation,
  useGetEventDatesQuery,
} from "../../api/eventApiSlice";
import { useGetPlacesQuery } from "../../api/filtersApiSlice";
import { useCallback, useState } from "react";
import { IEventFilter } from "../../types/filtersTypes";
import { format, addDays } from "date-fns";
import {Schedule} from "../../ui/components/schedule/schedule";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reduxStore";
import { useAlert } from "../../context/alertContext";
import { Alert } from "../../ui/components/alert/alert";
import { IPlace } from "../../types/filtersTypes";
import { Spinner } from "../../ui/components/spinner/spinner";
import { GroupedSelect } from "../../ui/components/groupedSelect/groupedSelect";
import { useTranslation } from "react-i18next";

export function UserFindSpot() {
  const { id: userId } = useSelector((root: RootState) => root.auth);
  const { data: places, isLoading: placesLoading } = useGetPlacesQuery(undefined,{refetchOnMountOrArgChange:false});
  const {t} = useTranslation("common");
  const [startDate,setStartDate] = useState(new Date());
  const [filters, setFilters] = useState<IEventFilter>({
    places:[0],
    arts:[]
  })

  const {
    data: events,isLoading,isFetching} = useGetFilteredEventsQuery(
    {
      range: {
        from: format(startDate, "yyyy-MM-dd"),
        to: format(new Date(addDays(startDate,6)), "yyyy-MM-dd"),
      },
      filters,
      checked: false,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [loginEvent] = useLoginEventMutation();

  const { showAlert } = useAlert();

  const handleLoginSpot = useCallback(
    async (event: number) => {
      const {data,error} = await loginEvent({ id: event, userId: userId });

      if (data) {
        if (data.success) {
          showAlert(<Alert type="positive">{data.message}</Alert>);
        } else {
          showAlert(<Alert type="negative">{data.message}</Alert>);
        }
      } else if (error) {
        showAlert(
          <Alert type="negative">Chyba serveru, zkuste to později.</Alert>
        );
      }
  },[loginEvent,showAlert,t]);

  return (
    <UserDashboard>
      <h3 className="h-xl xbold mb-16 text-center">Registrace místa</h3>
      {placesLoading ? (
        <Spinner />
      ) : (
        places && (
          <GroupedSelect<IPlace>
            placeholder="Místo..."
            style={{ minWidth: "350px", marginInline: "auto", width:'fit-content' }}
            className="mb-16"
            options={places}
            optionLabel={"spot"}
            groupKey={"city"}
            multiSelect={false}
            defaultValue={places[0]}
            returnSelected={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                places: [e.id],
              }))
            }
          />
        )
      )}
      
      <Schedule
        events={events}
        returnInterval={setStartDate}
        eventClick={handleLoginSpot}
        buttonText={t("button.booking")}
        isLoading = {isLoading || isFetching}
      />
    </UserDashboard>
  );
}
