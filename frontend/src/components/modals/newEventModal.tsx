import { Modal } from "./modal"
import { useModal } from "../../context/modalContext"
import { Input } from "../common/input";
import { Dropdown } from "../common/dropdown";
import { useApiGetNoParams, api } from "../../useApi/useApi";
import { IEvent, IPlace } from "../../types/types";
import { Button } from "../common/button";
import { useState } from "react";

export function NewEventModal () {

    const {closeModal} = useModal();
    const [day,setDay] = useState<Date>();
    const [start,setStart] = useState<String>();
    const [end,setEnd] = useState<String>();
    const [city,setCity] = useState<String>();

    const { data: places, loading:placeLoading, error:placeError } = useApiGetNoParams<IPlace[]>('/get_places');

    const placeOptions = places?.map(place => ({
        value: place.id,
        label: place.city + ', ' + place.spot
    })) || [];

    const handleCreate = async () => {

        try {
            const response = await api.post('/new_ev', null,
                {params: {
                    day,
                    start,
                    end,
                    city,
                }}
            );
            closeModal('newEventModal');
        } catch (err) {
            console.log('chyba');
        }
    }

    return (
        <Modal header="Nová událost" modalId="newEventModal">
            <div className="new-ev-cont">
            
                <Input variant="outbox" type="date" placeholder="Den" onChange={(e) => setDay( new Date(e.target.value))}></Input>
                <Input variant="outbox" type="time" placeholder="Začátek" onChange={(e) => setStart(e.target.value)}></Input>
                <Input variant="outbox" type="time" placeholder="Konec" onChange={(e) => setEnd(e.target.value)}></Input>
                <Dropdown placeholder="Město" options={placeOptions} returnSelected={(e:any) => setCity(e.target.value)}></Dropdown>
                <Button click={handleCreate}>Vytvořit událost</Button>
            </div>
        </Modal>
    )
}