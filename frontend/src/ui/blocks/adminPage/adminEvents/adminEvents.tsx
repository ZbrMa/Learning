//import { AdminEventsTable } from "./adminEventsTable";
/*import { Button } from "../../../components/button/button";
import { IoAddOutline } from "react-icons/io5";
import { useContext, useState } from "react";
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
import { Schedule } from "../../../components/schedule/schedule";
import { useGetAdminEventsQuery } from "../../../../api/eventApiSlice";
import { Spinner } from "../../../components/spinner/spinner";

export function AdminEvents() {
  const { setModal } = useContext(ModalContext);
  const [startDate,setStartDate] = useState(new Date());
  const {data,isLoading,isFetching,isError,refetch} = useGetAdminEventsQuery({startDate:startDate},{refetchOnMountOrArgChange:true});

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
      {isLoading || isFetching ? (
        <Spinner/>
      ):(
        <Schedule events={data} returnInterval={setStartDate} buttonText="Zrušit" eventClick={()=>console.log('ahoj')}/>
      )}
      
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
*/

export function AdminEvents() {
  return <div></div>
}