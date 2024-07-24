import { BodyBlock } from "../components/common/bodyBlock";
import { IEvent } from "../types/types";
import { useApiGet } from "../useApi/useApi";
import { useParams } from 'react-router-dom';
import { InfoLine } from "../components/common/infoLine";
import './styles/event.css';
import { BlockTitle } from "../components/common/blockTitle";
import { IoLogoInstagram, IoLogoTwitter, IoGlobeOutline } from "react-icons/io5";
import Map from "../components/specific/map";

export function EventPage() {

    const { eventId } = useParams();

    const {data:event,loading:loading,error:error} = useApiGet<IEvent>('/event_detail',{eventId});

    const formatDate = (date:Date) => {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('.');
    }

    console.log(event?.placeImage);

    if (loading) {
        return <div>Načítá se</div>;
    }

    if (error) {
        return <div>Chyba při načítání dat</div>;
    }

    console.log(event);
    return(
        <div className="page">
            <div className="event-banner" >
                <div className="event-banner-img" style={{backgroundImage:`url(${"/"+event?.placeImage})`}}>
                    <div className="event-banner-shadow"></div>
                    <div className="event-info">
                        <div className="event-info-name">{event?.name}</div>
                        {event &&(
                        <div className="event-info-date">
                            <div className="event-info-day">{formatDate(event.day)}</div>
                            <div className="event-info-separator"></div>
                            <div className="event-info-place">{event.city}</div>
                        </div>
                        )}
                    </div>  
                </div>
            </div>
            <BodyBlock>
                <BlockTitle text="Kdo se představí?"></BlockTitle>
                <div className="artist-container">
                    <div className="artist-info">
                        <div className="artist-detail">
                            <div className="info-item"><div className="info-item-title">Kdo</div>{event?.name}</div>
                            <div className="info-item"><div className="info-item-title">Odkud</div>{event?.nationality}</div>
                            <div className="info-item"><div className="info-item-title">Žánr</div>{event?.genre}</div>
                            <div className="artist-social">
                                <IoGlobeOutline></IoGlobeOutline>
                                <IoLogoInstagram></IoLogoInstagram>
                                <IoLogoTwitter></IoLogoTwitter>
                            </div>
                        </div>
                        
                    </div>
                    <div className="artist-about"><div className="artist-about-title">Něco o umělci</div>{event?.about}</div>
                    <div className="artist-image">
                        <img src={"/" + event?.image} alt="artist"/>
                    </div>
                </div>
            </BodyBlock>
            <BodyBlock color="secondary">
                <BlockTitle text="Kdy a kde?"></BlockTitle>
                <div className="place-container">
                    <div className="place-left">
                        <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Kdy</div>{event && formatDate(event.day)} {event && event.start}</div>
                        <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Město</div>{event?.city}</div>
                        <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Místo</div>{event?.spot}</div>
                        <div className="info-item" style={{fontSize:'18px'}}><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Popis</div>{event?.desc}</div>
                    </div>
                    <div className="place-right">
                        <img className="place-image" src={'/'+event?.placeImage}></img>
                    </div>
                </div>
                
            </BodyBlock>
            <BodyBlock color="secondary">
                <div className="place-path">
                    <div className="place-map">
                       {event && <Map clong={event.coorLong} clat={event.coorLat}></Map>} 
                    </div>
                    <div className="path-info">
                        <div className="info-item" style={{fontSize:'18px'}}><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Adresa</div>{event?.city}, {event?.spot}</div>
                        <div className="info-item" style={{fontSize:'18px'}}><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Souřadnice</div>{event?.coorLong} E, {event?.coorLat} N</div>
                        <div className="info-item" style={{fontSize:'18px'}}><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Jak se dostat na místo</div>{event?.path}</div>
                    </div>
                </div>
            </BodyBlock>
            {/*<BodyBlock>
                <div className="event-container">
                    <div className="event-info">
                        <div className="event-info-left">
                            <div className="event-info-name">{event?.name}</div>
                            {event &&(
                                <>
                                <InfoLine name="Kdy?" data={formatDate(event.day)}></InfoLine>
                                <InfoLine name="V kolik?" data={event.start}></InfoLine>
                                </>
                            )}
                        </div>
                        <div className="event-info-right">
                            <img src={"/" + event?.image} alt="artist"/>
                        </div>
                    </div>
                    <div className="artist-info">
                        <div className="artist-info-title">Kdo se představí?</div>
                        {event &&(
                                <>
                                <InfoLine name="Národnost" data={event.nationality}></InfoLine>
                                <InfoLine name="Žánr" data={event.genre}></InfoLine>
                                <div>{event.about}</div>
                                </>
                        )}
                    </div>
                    <div className="place-info">
                        <div className="place-info-name">Kde se to koná?</div>
                        {event &&(
                            <div className="place-info-detail">
                            <InfoLine name="Město" data={event.city}></InfoLine>
                            <InfoLine name="Místo" data={event.spot}></InfoLine>
                            </div>
                        )}
                    </div>
                </div>
            </BodyBlock>*/}

        </div>
    )
}