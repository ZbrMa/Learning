import { formatDate } from "date-fns";
import { useGetUpcomingEventsQuery } from "../../../api/eventApiSlice";
import { BodyBlock } from "../bodyBlock/bodyBlock";
import { SmallEventCard } from "../../components/smallEventCard/smallEventCard";
import { Carousel } from "../../components/carousel/carousel";
import { Button } from "../../components/button/button";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { SectionHeader } from "../bodyBlock/bodyBlock";
import './upcoming.css';

export function UpcomingBlock(){
    const {data:events,isFetching:eventsLoading} = useGetUpcomingEventsQuery();

    return(
        <BodyBlock>
            <div className="upcom__events g-32">
                <div className="flex-col">
                    <SectionHeader>Co se bude dít</SectionHeader>
                    <p className="pb-16 mb-16">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum.</p>
                    <Button variant='ternary' size='small'><Link to={'/events'} className="flex items-center g-8">Události <MdArrowForward/></Link></Button>
                </div>
            <Carousel
                smallDev={2}
                midDev={2}
                largeDev={2}
                extraDev={3}
                variant='arrowLeft'
                style={{gridTemplateColumns:'auto auto'}}
            >
            {events?.map((event,index)=>(
                <SmallEventCard event={event} key={event.nick+event.day}/>
            ))}
            </Carousel>
            </div>
            
        </BodyBlock>
    );
};