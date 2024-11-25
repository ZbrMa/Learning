import Table from "../../components/table/table";
import { Spinner } from "../../components/spinner/spinner";
import { IAdminEvent } from "../../../types/events";
import { IColumn } from "../../components/table/table";
import { useDeleteEventMutation, useGetAdminEventsQuery } from "../../../api/eventApiSlice";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { format, parse } from "date-fns";
import { Button } from "../../components/button/button";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../components/alert/alert";

export const AdminEventsTable = forwardRef(function AdminEventsTable(_, ref) {
  const { data, isLoading, isFetching } = useGetAdminEventsQuery();

  const [deleteEvent] = useDeleteEventMutation();
  const {showAlert} = useAlert();

  const handleDelete = async(id:number) => {
        const response = await deleteEvent({id:id});

        if(response.error){
            showAlert(<Alert type='negative'>Nepodařilo se smazat záznam.</Alert>);
        } else if (response.data){
            showAlert(<Alert type='positive'>Záznam byl úspěšně smazán.</Alert>);
        }
  };

  const columns: IColumn<IAdminEvent>[] = [
    {
      header: "Den",
      accessor: "day",
      render: (row) => <>{format(row.day, "dd.MM.yyyy")}</>,
    },
    {
      header: "Čas",
      accessor: "time",
      render: (row) => (
        <>{format(parse(row.time, "HH:mm:ss", new Date()), "HH:mm")}</>
      ),
    },
    {
      header: "Město",
      accessor: "city",
      render: (row) => <>{row.city}</>,
    },
    {
      header: "Spot",
      accessor: "spot",
      render: (row) => <>{row.spot}</>,
    },
    {
      header: "Umělec",
      accessor: "user",
      render: (row) => <>{row.user ?? "-"}</>,
    },
    {
      header: "Akce",
      render: (row) => (
        <div className="flex g-8">
          <Button
            variant="ternary"
            onClick={() => console.log(row.id)}
            style={{ fontSize: "0.8rem", padding: "4px 8px" }}
          >
            Upravit
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDelete(row.id)}
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
    <Table<IAdminEvent> columns={columns} data={data} />
  ) : (
    <span>Data nenalezena</span>
  );
});
