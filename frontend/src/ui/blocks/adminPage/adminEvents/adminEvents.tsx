import { AdminEventsTable } from "./adminEventsTable";
import { Button } from "../../../components/button/button";
import { IoAddOutline } from "react-icons/io5";
import { useContext, useRef } from "react";
import { ModalContext } from "../../../../context/modalContext";
import { Modal } from "../../../components/modal/modal";
import {
  Tabs,
  TabBody,
  TabsHeader,
  TabItem,
  TabsHeaderItem,
} from "../../../components/tabs/tabs";
import { NewEventForm } from "./newEventForm";
import { NewEventRepeatForm } from "./newEventRepeatForm";

export function AdminEvents() {
  const { setModal } = useContext(ModalContext);

  return (
    <div className="admin__events flex-col g-32">
      <Button
        variant="ternary"
        style={{ fontSize: "1rem", padding: "8px" }}
        onClick={() => setModal("newEventModal")}
      >
        <IoAddOutline />
        Nový termín
      </Button>
      <AdminEventsTable />
      <Modal id="newEventModal" title="Nový termín">
        <Tabs defaultTab="oneDay">
          <TabsHeader>
            <TabsHeaderItem value="oneDay">Jeden den</TabsHeaderItem>
            <TabsHeaderItem value="repeat">Opakování</TabsHeaderItem>
          </TabsHeader>
          <TabBody>
            <TabItem value="oneDay">
              <NewEventForm />
            </TabItem>
            <TabItem value="repeat">
              <NewEventRepeatForm/>
            </TabItem>
          </TabBody>
        </Tabs>
      </Modal>
    </div>
  );
}
