import {
  useGetAdminEventsQuery,
  useDeleteEventMutation
} from "../../../../api/eventApiSlice";
import { useGetPlacesQuery } from "../../../../api/filtersApiSlice";
import { useState } from "react";
import { format } from "date-fns";
import {Schedule} from "../../../../ui/components/schedule/schedule";
import { cs } from "date-fns/locale";
import { IPlace } from "../../../../types/filtersTypes";
import { Spinner } from "../../../../ui/components/spinner/spinner";
import { GroupedSelect } from "../../../../ui/components/groupedSelect/groupedSelect";
import { AdminDashboard } from "./adminDashboard";
import { Button } from "../../../../ui/components/button/button";
import { IoAddOutline } from "react-icons/io5";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import { Alert } from "../../../../ui/components/alert/alert";
import { useAlert } from "../../../../context/alertContext";
import { useCallback } from "react";
import { AdminEventModal } from "../../../../ui/modals/adminEventModal";

export function AdminEvents() {
  const {setModal} = useContext(ModalContext);
  const [startDate,setStartDate] = useState(new Date());
  const [place,setPlace] = useState<number[]>([]);
  const { data: places, isLoading: placesLoading } = useGetPlacesQuery();
  const {
    data: events,
    isLoading,
    isFetching
  } = useGetAdminEventsQuery(
  { 
      from: format(startDate, "yyyy-MM-dd"),
      places:place,
    },
    {refetchOnMountOrArgChange:true}
  );

  const [deleteEvent] = useDeleteEventMutation();

  const { showAlert } = useAlert();

  const deleteClick = useCallback((id: number) => {
    const event = events?.find(ev=>ev.id===id);
    
    if (event)
    showAlert(
      <Alert type="neutral" title="Opravdu si přejete smazat záznam?">
        <div className="flex-col g-8">
        <div>
          Kdy: {format(event.day, "dd.MM.yyyy")}, {event.start} - {event.end}
        </div>
        <div>
          Místo: {event.city}, {event.spot}
        </div>
        {event.nick && <div>Uživatel: {event.nick}</div>}
        <Button size="small" style={{fontSize:'0.9rem', padding:'0.6rem'}} onClick={() => handleDelete(event.id)}>
          Smazat
        </Button>
        </div>
      </Alert>,
      10000
    );
  },[]);

  const handleDelete = async (id: number) => {
    const response = await deleteEvent({ id: id });

    if (response.error) {
      showAlert(<Alert type="negative">Nepodařilo se smazat záznam.</Alert>);
    } else if (response.data) {
      showAlert(<Alert type="positive">Záznam byl úspěšně smazán.</Alert>);
    }
  };

  return (
  <>
    <AdminDashboard>
    <div className="flex g-32 mb-32">
          <h2 className="h-lg xbold">Termíny</h2>
          <Button
            variant="ternary"
            style={{ fontSize: "1rem", padding: "8px" }}
            onClick={() => setModal("newEventModal")}
          >
            <IoAddOutline />
            Nový termín
          </Button>
        </div>
      {placesLoading ? (
        <Spinner fixed={false} />
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
            returnSelected={(e) =>setPlace([...place,e.id])}
          />
        )
      )}

        <Schedule
        events={events}
        returnInterval={setStartDate}
        eventClick={deleteClick}
        buttonText="Smazat"
        isAdmin
        isLoading = {isLoading || isFetching}
      />
      
    </AdminDashboard>
    <AdminEventModal/>
    </>
  );
}
