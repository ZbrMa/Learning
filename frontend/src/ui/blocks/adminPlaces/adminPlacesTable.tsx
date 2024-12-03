import Table from "../../components/table/table";
import { Spinner } from "../../components/spinner/spinner";
import { IAdminEvent, IEditableEvent } from "../../../types/events";
import { IColumn } from "../../components/table/table";
import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { format, parse } from "date-fns";
import { Button } from "../../components/button/button";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../components/alert/alert";
import { ModalContext } from "../../../context/modalContext";
import { AdminEditEventModal } from "../../modals/adminEditEventModal";
import { useDeletePlaceMutation, useGetAdminPlacesQuery } from "../../../api/placeApiSlice";
import { IPlace } from "../../../types/places";
import { AdminEditPlaceModal } from "../../modals/adminEditPlaceModal";


const round = (n:number, dp:number) => {
    const h = +('1'.padEnd(dp + 1, '0'))
    return Math.round(n * h) / h
  }

export const AdminPlacesTable = forwardRef(function AdminEventsTable(_, ref) {
  const { data, isLoading, isFetching } = useGetAdminPlacesQuery();
  const [deletePlace] = useDeletePlaceMutation();
  const [editablePlace,setEditablePlace] = useState<IPlace>();
  const {setModal} = useContext(ModalContext);
  const {showAlert} = useAlert();

  const handleEdit = (place:IPlace) => {
    setEditablePlace(place);
    setModal('editPlaceModal');
  };

  const handleDelete = async(id:number) => {
    const response = await deletePlace({id:id});

    if(response.error){
      showAlert(<Alert type="negative" title="Chyba serveru">Při odstraňování nastala chyba. Zkus to později.</Alert>);
    } else if (response.data.success){
      showAlert(<Alert type="positive" title="Místo odstraněno">{response.data.message}</Alert>);
    } else {
      showAlert(<Alert type="negative" title="Chyba">{response.data.message}</Alert>);
    }
  };

  const deleteClick = useCallback((place: IPlace) => {
    showAlert(
      <Alert type="neutral" title="Opravdu si přejete smazat místo?">
        <div className="flex-col g-8">
        <div>
          {place.city}, {place.spot}
        </div>
        <Button size="small" style={{fontSize:'0.9rem', padding:'0.6rem'}} onClick={() => handleDelete(place.id)}>
          Smazat
        </Button>
        </div>
      </Alert>,
      10000
    );
  },[]);

  const columns: IColumn<IPlace>[] = [
    {
      header: "Město",
      accessor: "city",
      placeholder:"město",
      render: (row) => (
        <>{row.city}</>
      ),
    },
    {
      header: "Místo",
      accessor: "spot",
      placeholder:"místo",
      render: (row) => (
        <>{row.spot}</>
      ),
    },
    {
      header: "Zem. délka",
      accessor: "longitude",
      placeholder:"zem. délka",
      render: (row) => <>{round(row.longitude,6)}</>,
    },
    {
        header: "Zem. šířka",
        accessor: "latitude",
        placeholder:"zem. šířka",
        render: (row) => <>{round(row.latitude,6)}</>,
    },
    {
      header: "Popis",
      accessor: "about",
      render: (row) => <>{row.about}</>,
    },
    {
      header: "Akce",
      render: (row) => (
        <div className="flex g-8">
          <Button
            variant="ternary"
            onClick={() => handleEdit(row)}
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
    <Table<IPlace> columns={columns} data={data} />
    <AdminEditPlaceModal place={editablePlace}/>
    </>
  ) : (
    <span>Data nenalezena</span>
  );
});
