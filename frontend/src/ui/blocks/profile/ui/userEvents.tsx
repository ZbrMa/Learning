import { memo } from "react";
import { useGetUserEventsQuery } from "../../../../api/eventApiSlice";
import { LoginEventCard } from "../../../components/loginEventCard/loginEventCard";
import { BodyBlock } from "../../bodyBlock/bodyBlock";
import { format } from "date-fns";
import { Spinner } from "../../../components/spinner/spinner";

type UserEventsProps = {
    userId:number,
    action?:'signOut' | 'no action'
}

export const UserEvents = memo(function UserEvents ({userId,action = 'no action'}:UserEventsProps) {

    const {data:events,isLoading,isFetching} = useGetUserEventsQuery({userId:userId,startDate:new Date()},{refetchOnMountOrArgChange:true});

    return(
            <div className="user__events flex-col g-16 relative">
                {isLoading || isFetching ? (
                    <Spinner fixed={false}/>
                ):(
                    events?.map((event,index)=>(
                        <LoginEventCard event={event} variant={action} key={format(event.day,'dd.MM.yyyy')+ event.start}/>
                    ))
                )}
                
            </div>
    );
});