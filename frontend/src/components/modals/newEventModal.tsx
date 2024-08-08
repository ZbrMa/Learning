import { Modal } from "./modal"
import { useModal } from "../../context/modalContext"
import { Input } from "../common/input";
import { Dropdown } from "../common/dropdown";
import { useApiGetNoParams, api } from "../../useApi/useApi";
import { IEvent, IPlace } from "../../types/types";
import { Button } from "../common/button";
import { useEffect, useState } from "react";

export function NewEventModal () {

    const {closeModal} = useModal();
    const [day,setDay] = useState<string>();
    const [start,setStart] = useState<string>();
    const [end,setEnd] = useState<string>();
    const [city,setCity] = useState<number>();

    const { data: places, loading:placeLoading, error:placeError } = useApiGetNoParams<IPlace[]>('/get_places');

    const placeOptions = places?.map(place => ({
        value: place.id,
        label: place.city + ', ' + place.spot
    })) || [];

    const handleDate = (date:Date) => {
        setDay(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    }

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

    const getPlace = (selected:number)=> {
        setCity(selected);
    };

    return (
        <Modal header="Nová událost" modalId="newEventModal">
            <div className="new-ev-cont">
                <Input variant="outbox" type="date" placeholder="Den" onChange={(e) => handleDate( new Date(e.target.value))}></Input>
                <Input variant="outbox" type="time" placeholder="Začátek" onChange={(e) => setStart(e.target.value)}></Input>
                <Input variant="outbox" type="time" placeholder="Konec" onChange={(e) => setEnd(e.target.value)}></Input>
                <Dropdown placeholder="Město" options={placeOptions} returnSelected={getPlace} multiSelect={false}></Dropdown>
                <Button click={handleCreate}>Vytvořit událost</Button>
            </div>
        </Modal>
    )
}