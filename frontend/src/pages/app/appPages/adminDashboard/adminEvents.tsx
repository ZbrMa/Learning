import { AdminEventsTable } from "../../../../ui/blocks/adminPage/adminEvents/adminEventsTable";
import { AdminDashboard } from "./adminDashboard";
import { Button } from "../../../../ui/components/button/button";
import { IoAddOutline } from "react-icons/io5";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import { AdminEventModal } from "../../../../ui/modals/adminEventModal";

export function AdminEvents() {
  const { setModal } = useContext(ModalContext);

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
        <AdminEventsTable />
      </AdminDashboard>
      <AdminEventModal/>
    </>
  );
}
