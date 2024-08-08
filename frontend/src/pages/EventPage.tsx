import { BodyBlock } from "../components/common/bodyBlock";
import { IEvent } from "../types/types";
import { useApiGet } from "../useApi/useApi";
import { useParams } from 'react-router-dom';
import { InfoLine } from "../components/common/infoLine";
import './styles/event.css';
import { BlockTitle } from "../components/common/blockTitle";
import { IoLogoInstagram, IoLogoTwitter, IoGlobeOutline } from "react-icons/io5";
import Map from "../components/specific/map";
import { useEffect } from "react";
import { Button } from "../components/common/button";
import { EventLoginModal } from "../components/modals/eventLoginModal";
import { useModal } from "../context/modalContext";

export function EventPage() {

    const { eventId } = useParams();
    const { openModal } = useModal();
    const { data:event, loading:loading, error:error } = useApiGet<IEvent>('/event_detail',{eventId},false);

    const formatDate = (date:Date) => {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('.');
    }

    if (loading) {
        return <div>Načítá se</div>;
    }

    if (error) {
        return <div>Chyba při načítání dat</div>;
    }

    return(
        <div className="page">
            {event?.confirmed &&(
                <>
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
                </>
            )}
            <BodyBlock color="secondary">
                {event?.confirmed&&(<BlockTitle text="Kdy a kde?"></BlockTitle>)}
                <div className="place-container" style={{marginTop: event?.confirmed? '0px' : '60px'}}>
                    <div className="place-left">
                        <div className="info-item-container">
                            <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)', gridColumn: '1 / span 1'}}>Den</div>{event && formatDate(event.day)}</div>
                            <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)', gridColumn: '2 / span 1'}}>Začátek</div>{event && event.start}</div>
                            <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)', gridColumn: '3 / span 1'}}>Konec</div>{event && event.end}</div>
                        </div>
                        
                        <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Město</div>{event?.city}</div>
                        <div className="info-item"><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Místo</div>{event?.spot}</div>
                    </div>
                    <div className="place-right">
                        <img className="place-image" src={'/'+event?.placeImage}></img>
                    </div>
                    <div className="info-item" style={{fontSize:'18px', gridColumn: '1 / span 2'}}><div className="info-item-title" style={{borderBottom:'2px solid var(--lightGrey)'}}>Popis</div>{event?.desc}</div>
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
               {!event?.confirmed &&(
                    <div style={{textAlign:'center',marginTop:'32px'}}>
                        <Button click={()=>openModal('eventLogin')}>Přihlásit se na termín</Button>
                    </div>
                )} 
            </BodyBlock>
            <EventLoginModal></EventLoginModal>
        </div>
    )
}