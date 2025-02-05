import { IoLocationOutline } from 'react-icons/io5';
import { IEvent } from '../../../types/event';
import { formatDate } from 'date-fns';
import { format } from 'date-fns';
import {cs} from 'date-fns/locale';
import './smallEventCard.css';
import { Badge } from '../badge/badge';
import { useContext, memo } from 'react';
import { ModalContext } from '../../../context/modalContext';
import { EventModal } from '../../modals/eventModal';

type SmallEventCardProps = {
    event:IEvent,
    square?:boolean,
};

export const SmallEventCard = memo(function SmallEventCard({event,square=false}:SmallEventCardProps){
    const {setModal} = useContext(ModalContext);

    const handleClick = async() => {
        setModal(`event${event.id}`);
    };

    return(
        <>
        <div className={`event__card__sm ${square? 'square':''}`} onClick={handleClick}>
            <div className="card--overlay gradient"></div>
            <img className='card--img' src={event.image} alt={event.nick+event.image}/>
            <div className="event__date p-8 box">
                <div className="event--day tx-white h-lg xbold">{formatDate(event.day,'dd')}.</div>
                <div className="event__my flex g-8">
                    <span className="event--month tx-white">{format(event.day,"MMM" ,{ locale: cs })}</span>
                    <span className="event--year tx-white">{formatDate(event.day,'yy')}</span>
                </div>
            </div>
            <div className="event__content p-32">
                <div className='flex g-8'>
            {event.arts && event.arts.map(art=>(
                <Badge key={art}>{art}</Badge>
              ))}
              </div>
                <h2 className='h-md xbold tx-white'>{event.nick}</h2>
                <div className="event__place tx-white tx-sm">
                    <IoLocationOutline/>
                    {event.city}, {event.spot}
                </div>
            </div>
            
        </div>
        <EventModal event={event}/>
        </>
    );
});