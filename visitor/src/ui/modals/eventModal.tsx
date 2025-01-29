import {
    IoCloseOutline,
    IoLocationOutline,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoTwitter,
    IoLogoWebComponent,
    IoTimeOutline,
  } from "react-icons/io5";
  import { IEvent } from "../../types/event";
  import { Modal } from "../components/modal/modal";
  import { format, formatDate , parse} from "date-fns";
  import "./eventModal.css";
  import { cs } from "date-fns/locale";
  import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
  import { Button, IconButton } from "../components/button/button";
  import { Badge } from "../components/badge/badge";
  import { Link } from "react-router-dom";
  
  type EventModalProps = {
    event: IEvent;
  };
  
  export function EventModal({ event }: EventModalProps) {
    const { setModal } = useContext(ModalContext);
  
    return (
      <Modal id={`event${event.id}`} custom>
        <div className=" grid-2 event__modal">
          <div className="event__left">
            <IconButton variant="secondary" onClick={() => setModal(null)}>
              <IoCloseOutline />
            </IconButton>
            <img className="event--modal--img" src={event.image} alt={event.nick + event.day}/>
          </div>
          <div className="event__right p-32 flex-col g-16 box">
            <div className="event__head flex content-space items-center pb-16">
              <div className="event__name">
                <h1 className="h-xl xbold mb-8">{event.nick}</h1>
                <div className="flex g-8">
                {event.arts.map((art)=>(
                  <Badge key={art}>{art}</Badge>
                ))}
                  </div>
              </div>
              <div className="event__detail__date p-8 box">
                <div className="event--day tx-white h-lg xbold">
                  {formatDate(event.day, "dd")}.
                </div>
                <div className="event__my grid-2 g-8">
                  <span className="event--month tx-white">
                    {format(event.day, "MMM", { locale: cs })}
                  </span>
                  <span className="event--year tx-white">
                    {formatDate(event.day, "yy")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-col g-16">
              <div className="flex g-8 items-center tx-md bold">
                <IoTimeOutline />
                {format(parse(event.start, "HH:mm:ss", new Date()), "HH:mm")}
                -
                {format(parse(event.end, "HH:mm:ss", new Date()), "HH:mm")}
              </div>
              <div className="flex g-8 items-center tx-md bold">
                <IoLocationOutline />
                {event.city}, {event.spot}
              </div>
            </div>
          <p className="event--about py-16 box tx-sm">{event.about}</p>
            <div className="event__bottom flex content-space items-center tx-md pt-16">
              <Link to={`/user/${event.artistId}`} onClick={()=>setModal(null)}>
                <Button variant="link" className="xbold" style={{padding:'0'}}>
                  <span className="tx-gray tx-xs">Více o</span> {event.nick}
                </Button>
              </Link>
              <div className="tx-black flex g-16 items-center">
                {event.website && (
                  <a href={event.website} target="_blank">
                    <IoLogoWebComponent />
                  </a>
                )}
                {event.facebook && (
                  <a href={event.facebook} target="_blank">
                    <IoLogoFacebook />
                  </a>
                )}
                {event.instagram && (
                  <a href={event.instagram} target="_blank">
                    <IoLogoInstagram />
                  </a>
                )}
                {event.twitter && (
                  <a href={event.twitter} target="_blank">
                    <IoLogoTwitter />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  