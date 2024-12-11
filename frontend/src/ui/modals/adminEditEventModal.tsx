import { IEditableEvent } from "../../types/events";
import { Modal } from "../../ui/components/modal/modal";
import { EditEventForm } from "../blocks/adminPage/adminEvents/editEventForm";
import "./eventModal.css";

type EditEventProps = {
    event:IEditableEvent | undefined,
};

export function AdminEditEventModal({event}:EditEventProps) {
     if(event){
        return(
            <Modal id="editEventModal" title="Úprava termínu">
                <EditEventForm event={event}/>
            </Modal>
        );
     };
     return null;
    
};