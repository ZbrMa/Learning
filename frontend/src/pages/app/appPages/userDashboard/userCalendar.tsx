import { UserDashboard } from "./userDashboard";
import { useSelector } from "react-redux";
import { useGetUserCalendarEventsQuery } from "../../../../api/eventApiSlice";
import { Schedule } from "../../../../ui/components/schedule/schedule";
import { RootState } from "../../../../store/reduxStore";
import { useState } from "react";
import { useSignOutEventMutation } from "../../../../api/eventApiSlice";
import { useAlert } from "../../../../context/alertContext";
import { Alert } from "../../../../ui/components/alert/alert";

export function UserCalendar(){

    const {id} = useSelector((root:RootState)=>root.auth);
    const [startDate,setStartDate] = useState(new Date());
    const {data,isLoading,isFetching,isError,refetch} = useGetUserCalendarEventsQuery({userId:id,startDate:startDate},{refetchOnMountOrArgChange:true});
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
        <UserDashboard>
            <h3 className="h-xl xbold mb-32 text-center">Můj kalendář</h3>
            <Schedule events={data} returnInterval={setStartDate} buttonText="Zrušit" eventClick={(handleSignOut)}/>
        </UserDashboard>
    )
};