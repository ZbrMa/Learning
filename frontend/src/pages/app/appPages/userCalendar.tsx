import { useSelector } from "react-redux";
import { useGetUserEventsQuery } from "../../../api/eventApiSlice";
import { BodyBlock } from "../../../ui/blocks/bodyBlock/bodyBlock";
import { EventSearchBlock } from "../../../ui/blocks/eventSearch/eventSearch";
import { Calendar } from "../../../ui/components/calendar/calendar";
import { Schedule } from "../../../ui/components/schedule/schedule";
import { VisitorLayout } from "../../visitor/visitorLayout";
import { RootState } from "../../../store/userStore";
import { useState } from "react";
import { useSignOutEventMutation } from "../../../api/eventApiSlice";
import { Button } from "../../../ui/components/button/button";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../../ui/components/alert/alert";

export function UserCalendar(){
    const {id} = useSelector((root:RootState)=>root.auth);
    const [startDate,setStartDate] = useState(new Date());
    const {data,isLoading,isFetching,isError,refetch} = useGetUserEventsQuery({userId:id,startDate:startDate},{refetchOnMountOrArgChange:true});
    const [signOutEvent] = useSignOutEventMutation();
    const {showAlert} = useAlert();

    const handleSignOut = async (id:number) => {
        const response = await signOutEvent({ id:id });
    
        if (response.data) {
          if (response.data.success) {
            showAlert(<Alert type="positive">{response.data.message}</Alert>);
          } else {
            showAlert(<Alert type="negative">{response.data.message}</Alert>);
          }
        } else if (response.error) {
          showAlert(
            <Alert type="negative">Chyba serveru, zkuste to později.</Alert>
          );
        }
      };

    return(
        <VisitorLayout>
      <BodyBlock style={{ marginTop: "0" }}>
        <Schedule events={data} returnInterval={setStartDate} buttonText="Zrušit" eventClick={(handleSignOut)}/>
      </BodyBlock>
    </VisitorLayout>
    );
};