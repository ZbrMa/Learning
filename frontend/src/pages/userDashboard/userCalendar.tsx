import { UserDashboard } from "./userDashboard";
import { useSelector } from "react-redux";
import { useGetUserCalendarEventsQuery } from "../../api/eventApiSlice";
import { Schedule } from "../../ui/components/schedule/schedule";
import { RootState } from "../../store/reduxStore";
import { useCallback, useState, useRef, useEffect } from "react";
import { useSignOutEventMutation } from "../../api/eventApiSlice";
import { useAlert } from "../../context/alertContext";
import { Alert } from "../../ui/components/alert/alert";
import { useTranslation } from "react-i18next";
import { startOfISOWeek } from "date-fns";

export function UserCalendar(){

    const {id} = useSelector((root:RootState)=>root.auth);
    const [startDate,setStartDate] = useState(startOfISOWeek(new Date));
    const {data,isLoading,isFetching} = useGetUserCalendarEventsQuery({userId:id,startDate:startDate},{refetchOnMountOrArgChange:true});
    const [signOutEvent] = useSignOutEventMutation();
    const {showAlert} = useAlert();
    const {t} = useTranslation("common");

    const handleSignOut = useCallback( 
      async (eventId:number) => {
        const {data,error} = await signOutEvent({ id:eventId });
    
        if (data) {
          if (data.success) {
            showAlert(<Alert type="positive">{data.message}</Alert>);
          } else {
            showAlert(<Alert type="negative">{data.message}</Alert>);
          }
        } else if (error) {
          showAlert(
            <Alert type="negative">{t("errors.server")}</Alert>
          );
        }
      }
    ,[signOutEvent,t,showAlert]);

    return(
        <UserDashboard>
            <h3 className="h-xl xbold mb-32 text-center">{t("button.myCalendar")}</h3>
            <Schedule events={data} returnInterval={setStartDate} buttonText={t("button.cancel")} eventClick={(handleSignOut)} isLoading = {isLoading || isFetching}/>
        </UserDashboard>
    )
};