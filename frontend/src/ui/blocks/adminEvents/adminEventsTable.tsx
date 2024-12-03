import Table from "../../components/table/table";
import { Spinner } from "../../components/spinner/spinner";
import { IAdminEvent, IEditableEvent } from "../../../types/events";
import { IColumn } from "../../components/table/table";
import {
  useDeleteEventMutation,
  useGetAdminEventsQuery,
} from "../../../api/eventApiSlice";
import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { format, parse } from "date-fns";
import { Button } from "../../components/button/button";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../components/alert/alert";
import { ModalContext } from "../../../context/modalContext";
import { AdminEditEventModal } from "../../modals/adminEditEventModal";

export const AdminEventsTable = forwardRef(function AdminEventsTable(_, ref) {
  const { data, isLoading, isFetching } = useGetAdminEventsQuery();
  const [editableEvent,setEditableEvent] = useState<IEditableEvent>();

  const [deleteEvent] = useDeleteEventMutation();
  const { showAlert } = useAlert();
  const { setModal } = useContext(ModalContext);

  const deleteClick = useCallback((event: IAdminEvent) => {
    showAlert(
      <Alert type="neutral" title="Opravdu si přejete smazat záznam?">
        <div className="flex-col g-8">
        <div>
          Kdy: {format(event.day, "dd.MM.yyyy")}, {event.start} - {event.end}
        </div>
        <div>
          Místo: {event.city}, {event.spot}
        </div>
        {event.user && <div>Uživatel: {event.user}</div>}
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

  const handleEdit = (event:IEditableEvent) => {
    setEditableEvent(event);
    setModal("editEventModal");
  };

  const columns: IColumn<IAdminEvent>[] = [
    {
      header: "Den",
      accessor: "day",
      placeholder:"den",
      render: (row) => <>{format(row.day, "dd.MM.yyyy")}</>,
    },
    {
      header: "Začátek",
      accessor: "start",
      placeholder:"začátek",
      render: (row) => (
        <>{format(parse(row.start, "HH:mm:ss", new Date()), "HH:mm")}</>
      ),
    },
    {
      header: "Konec",
      accessor: "end",
      placeholder:"konec",
      render: (row) => (
        <>{format(parse(row.end, "HH:mm:ss", new Date()), "HH:mm")}</>
      ),
    },
    {
      header: "Město",
      accessor: "city",
      placeholder:"město",
      render: (row) => <>{row.city}</>,
    },
    {
      header: "Spot",
      accessor: "spot",
      placeholder:"místo",
      render: (row) => <>{row.spot}</>,
    },
    {
      header: "Uživatel",
      accessor: "user",
      placeholder:"uživatel",
      render: (row) => <>{row.user ?? "-"}</>,
    },
    {
      header: "Akce",
      render: (row) => (
        <div className="flex g-8">
          <Button
            variant="ternary"
            onClick={() => handleEdit({id:row.id,day:format(row.day,'yyyy-MM-dd'),start:row.start,end:row.end})}
            style={{ fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Upravit
          </Button>
          <Button
            variant="primary"
            onClick={() => deleteClick(row)}
            style={{ fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Smazat
          </Button>
        </div>
      ),
    },
  ];

  return isFetching || isLoading ? (
    <Spinner fixed={false} />
  ) : data ? (
    <>
    <Table<IAdminEvent> columns={columns} data={data} />
    <AdminEditEventModal event={editableEvent}/>
    </>
  ) : (
    <span>Data nenalezena</span>
  );
});
