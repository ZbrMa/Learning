import { useContext } from "react";
import { INotification } from "../../types/notifications";
import { NewMessage, NotificationDetail } from "../blocks/notifications/notificationContainer";
import { Modal } from "../components/modal/modal";
import { NotificationContext } from "../../context/notificationContext";


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
    const {notification } = useContext(NotificationContext);

    return(
        <Modal id="read-msg-modal" title={notification?.subject} color="black">
            <NotificationDetail flow={flow}/>
        </Modal>
    )
};