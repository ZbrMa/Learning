import { useContext } from "react";
import { INotification } from "../../types/notifications";
import { NewMessage, NotificationDetail } from "../blocks/notifications/notificationContainer";
import { Modal } from "../components/modal/modal";
import { NotificationContext } from "../../context/notificationContext";
import { format, parse } from "date-fns";

import './messageModals.css';

export function NewMessageModal(){

    return(
        <Modal id="msg-modal" title="Nová zpráva" color="black">
            <NewMessage/>
        </Modal>
    )
};

type ReadMessageProps = {
    flow:'from'|'to',
}

export function ReadMessageModal({flow}:ReadMessageProps){
    const {notification,setNotification } = useContext(NotificationContext);

    return(
        <Modal id="read-msg-modal" title={notification?.subject} color="black" onClose={()=>setNotification(null)}>
            {notification &&
                (
                  <div className="notification__detail">
                    <div className="notification__header mb-32 pb-16">
                      <div className="flex content-space items-base mb-16 g-16">
                        <h3 className="h-sm xbold">{notification.subject}</h3>
                        <p className="tx-xs bold notification--time">
                          {format(notification.day, "dd.MM.yyyy")}, {format(parse(notification.time, "HH:mm:ss", new Date()), "HH:mm")}
                        </p>
                      </div>
                      <div className="flex-col g-8 pb-8">
                        <p className="tx-sm bold">
                          <span className="tx-gray tx-xs">Od: </span>
                          {notification.from_user}
                        </p>
                        {/*<span className='tx-lg tx-lightGray'>&#x2022; &#x2022; &#x2022;</span>*/}
                        <p className="tx-sm bold">
                          <span className="tx-gray tx-xs">Pro: </span>
                          {notification.to_user}
                        </p>
                      </div>
                    </div>
                    <p className="tx-sm">{notification.content}</p>
                  </div>
                )
              }
        </Modal>
    )
};