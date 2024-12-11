import { NewEventForm } from "../blocks/adminPage/adminEvents/newEventForm";
import { NewEventRepeatForm } from "../blocks/adminPage/adminEvents/newEventRepeatForm";
import { Modal } from "../../ui/components/modal/modal";
import {
  Tabs,
  TabBody,
  TabsHeader,
  TabItem,
  TabsHeaderItem,
} from "../../ui/components/tabs/tabs";
import "./eventModal.css";

export function AdminEventModal(){
    return(
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
              <NewEventRepeatForm />
            </TabItem>
          </TabBody>
        </Tabs>
      </Modal>
    )
}
