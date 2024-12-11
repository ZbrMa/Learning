import { useContext, useState } from "react";
import { IEditableEvent } from "../../../../types/events";
import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import { useEditEventMutation } from "../../../../api/eventApiSlice";
import { useAlert } from "../../../../context/alertContext";
import { Alert } from "../../../components/alert/alert";
import { ModalContext } from "../../../../context/modalContext";
import { format,addDays } from "date-fns";

type EditEventForm = {
    event:IEditableEvent,
}

export function EditEventForm({event}:EditEventForm) {
    const [newEvent,setNewEvent] = useState<IEditableEvent>(event);
    const [defaultEvent,setDefaultEvent] = useState(event);
    const [createEvent] = useEditEventMutation();
    const {showAlert} = useAlert();
    const {setModal} = useContext(ModalContext);

    const handleSetNewEvent = (key:keyof IEditableEvent, value:any) => {
        setNewEvent({
            ...newEvent,
            [key]:value,
        })
    };

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await createEvent(newEvent);

        if(response.error){
            showAlert(<Alert type='negative'>Při úpravě nastala chyba.</Alert>);
        } else if (response.data.success){
            setModal(null);
            showAlert(<Alert type='positive'>{response.data.message}</Alert>);
        } else {
            setModal(null);
            showAlert(<Alert type='negative'>{response.data.message}</Alert>);
        }
    };

    return(
        <form className="flex-col g-16" onSubmit={(e)=>handleSubmit(e)}>
                <Input
                    type='date'
                    onChange={(e)=>handleSetNewEvent('day',e.target.value)}
                    label="Den"
                    labelPosition="out"
                    min={format(addDays(new Date,1),'yyyy-MM-dd')}
                    defaultValue={defaultEvent.day}
                />
                <Input
                    type='time'
                    onChange={(e)=>handleSetNewEvent('start',e.target.value)}
                    label="Začátek"
                    labelPosition="out"
                    defaultValue={defaultEvent.start}
                />
                <Input
                    type='time'
                    onChange={(e)=>handleSetNewEvent('end',e.target.value)}
                    label="Konec"
                    labelPosition="out"
                    defaultValue={defaultEvent.end}
                />
                <Button type='submit' style={{width:'100%'}}>Upravit</Button>
            </form>
    );
};