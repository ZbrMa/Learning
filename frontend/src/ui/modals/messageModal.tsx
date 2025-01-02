import { NewMessage } from "../blocks/notifications/notificationContainer";
import { Modal } from "../components/modal/modal";


export function MessageModal(){

    return(
        <Modal id="msg-modal" title="Nová zpráva" color="black">
            <NewMessage/>
        </Modal>
    )
};