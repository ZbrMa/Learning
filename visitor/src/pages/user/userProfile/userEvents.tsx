import { memo, useEffect } from "react";
import { useGetUserEventsMutation } from "../../../api/apiSlicer";
import { LoginEventCard } from "../../../ui/components/loginEventCard/loginEventCard";
import { format } from "date-fns";
import { Spinner } from "../../../ui/components/spinner/spinner";
import { useParams } from "react-router";

export const UserEvents = memo(function UserEvents () {
    let {id} = useParams();

    const [fetchEvents,{data:events,isLoading,isSuccess,isError}] = useGetUserEventsMutation();
  
    useEffect(()=>{
      if( id ) fetchEvents({userId:parseInt(id as string),startDate:new Date()})
    },[id,fetchEvents]);
    
    return (
        <div className="user__events flex-col g-16 relative">
          {isLoading ? (
            <Spinner fixed={false} />
          ) : isSuccess && !isError && events && events.length > 0 ? (
            events.map((event, index) => (
              <LoginEventCard
                event={event}
                key={format(event.day, 'dd.MM.yyyy') + event.start + index}
              />
            ))
          ) : (
            <p>Žádné události</p>
          )}
        </div>
      );
});