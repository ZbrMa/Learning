import { IPlace } from "../../types/places";
import { Modal } from "../../ui/components/modal/modal";
import { EditPlaceForm } from "../blocks/adminPlaces/editPlaceForm";
import "./eventModal.css";

type EditPlaceProps = {
    place:IPlace | undefined,
};

export function AdminEditPlaceModal({place}:EditPlaceProps) {
     if(place){
        return(
            <Modal id="editPlaceModal" title="Úprava místa">
                <EditPlaceForm place={place}/>
            </Modal>
        );
     };
     return null;
    
};