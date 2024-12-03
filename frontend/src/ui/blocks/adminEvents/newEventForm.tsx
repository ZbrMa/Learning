import { useContext, useState } from "react";
import { useGetPlacesQuery } from "../../../api/filtersApiSlice";
import { GroupedDropdown } from "../../components/groupedDropdown/groupedDropdown";
import { INewEvent } from "../../../types/events";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { useCreateNewEventMutation } from "../../../api/eventApiSlice";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../components/alert/alert";
import { ModalContext } from "../../../context/modalContext";
import { format,addDays } from "date-fns";



export function NewEventForm() {
    const {data:places} = useGetPlacesQuery();
    const [newEvent,setNewEvent] = useState<INewEvent>({day:'',start:'',end:'',place:-1});
    const [createEvent] = useCreateNewEventMutation();
    const {showAlert} = useAlert();
    const {setModal} = useContext(ModalContext);

    const handleSetNewEvent = (key:keyof INewEvent, value:any) => {
        setNewEvent({
            ...newEvent,
            [key]:value,
        })
    };

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await createEvent(newEvent);

        if(response.error){
            showAlert(<Alert type='negative'>Při vytváření nastala chyba.</Alert>);
        } else if (response.data.success){
            setModal(null);
            showAlert(<Alert type='positive'>{response.data.message}</Alert>);
        }
    };

    return(
        <form className="grid-2 g-16" onSubmit={(e)=>handleSubmit(e)}>
                {places && 
                    <GroupedDropdown
                        options={places}
                        groupKey='city'
                        returnSelected={(e)=>handleSetNewEvent('place',e[0]?.id)}
                        placeholder="Místo"
                        optionLabel='spot'
                        multiSelect={false}
                        label="Místo"
                    />
                }
                <Input
                    type='date'
                    onChange={(e)=>handleSetNewEvent('day',e.target.value)}
                    label="Den"
                    labelPosition="out"
                    min={format(addDays(new Date,1),'yyyy-MM-dd')}
                />
                <Input
                    type='time'
                    onChange={(e)=>handleSetNewEvent('start',e.target.value)}
                    label="Začátek"
                    labelPosition="out"
                />
                 <Input
                    type='time'
                    onChange={(e)=>handleSetNewEvent('end',e.target.value)}
                    label="Konec"
                    labelPosition="out"
                />
                <Button type='submit'>Vytvořit</Button>
            </form>
    );
};