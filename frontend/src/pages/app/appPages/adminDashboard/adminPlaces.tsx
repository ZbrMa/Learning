import { AdminDashboard } from "./adminDashboard";
import { Button } from "../../../../ui/components/button/button";
import { IoAddOutline } from "react-icons/io5";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import { AdminNewPlaceModal } from "../../../../ui/modals/adminPlaceModal";
import { AdminPlacesTable } from "../../../../ui/blocks/adminPage/adminPlaces/adminPlacesTable";

export function AdminPlaces() {
  const { setModal } = useContext(ModalContext);

  return (
    <>
      <AdminDashboard>
        <div className="flex g-32 mb-32">
          <h2 className="h-lg xbold">Místa</h2>
          <Button
            variant="ternary"
            style={{ fontSize: "1rem", padding: "8px" }}
            onClick={() => setModal("newPlaceModal")}
          >
            <IoAddOutline />
            Nové místo
          </Button>
        </div>
        <AdminPlacesTable />
      </AdminDashboard>
      <AdminNewPlaceModal />
    </>
  );
}
