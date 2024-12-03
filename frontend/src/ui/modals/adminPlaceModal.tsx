import { NewPlaceForm } from "../blocks/adminPlaces/createPlaceForm";
import { Modal } from "../components/modal/modal";

export function AdminNewPlaceModal(){

    return(
        <Modal id="newPlaceModal" title="Nové místo">
            <NewPlaceForm/>
        </Modal>
    );
};