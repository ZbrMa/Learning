import { memo, useEffect } from "react";
import { useGetUserEventsMutation } from "../../../../api/eventApiSlice";
import { LoginEventCard } from "../../../components/loginEventCard/loginEventCard";
import { format } from "date-fns";
import { Spinner } from "../../../components/spinner/spinner";
import { useParams } from "react-router";

type UserEventsProps = {
    action?:'signOut' | 'no action'
}

export const UserEvents = memo(function UserEvents ({action = 'no action'}:UserEventsProps) {
    let {userId} = useParams();

    const [fetchEvents,{data:events,isLoading,isSuccess,isError}] = useGetUserEventsMutation();
  
    useEffect(()=>{
      if( userId) fetchEvents({userId:parseInt(userId),startDate:new Date()})
    },[userId]);
    
    return (
        <div className="user__events flex-col g-16 relative">
          {isLoading ? (
            <Spinner fixed={false} />
          ) : isSuccess && !isError && events && events.length > 0 ? (
            events.map((event, index) => (
              <LoginEventCard
                event={event}
                variant={action}
                key={format(event.day, 'dd.MM.yyyy') + event.start + index}
              />
            ))
          ) : (
            <p>Žádné události</p>
          )}
        </div>
      );
});