import { BodyBlock } from "../components/common/bodyBlock";
import { useState } from "react";
import { AdminEventsTable } from "../components/specific/adminEventsTable";
import { IoAdd } from "react-icons/io5";
import './styles/subMenu.css';
import { Button } from "../components/common/button";
import { BlockTitle } from "../components/common/blockTitle";
import { useModal } from "../context/modalContext";
import { NewEventModal } from "../components/modals/newEventModal";

export function AdminPage() {
    const [type,setType] = useState<'event'|'user'>('event');
    const { openModal } = useModal();

    return(
        <div className="page">
                <div className="sub-menu">
                    <Button click={() => setType('event')} variant="grey">
                        Události    
                    </Button>
                    <Button click={() => setType('user')} variant="grey">
                        Uživatelé    
                    </Button>
                </div>
           
            <BodyBlock>
                <BlockTitle text={type === 'event' ? 'Události' : 'Uživatelé'}></BlockTitle>
                <div className="admin-container">
                    {type === 'event' &&
                    <>
                        <Button click={()=>openModal('newEventModal')}>Přidat událost</Button>
                        <AdminEventsTable></AdminEventsTable>
                    </>
                    }
                    {type === 'user' &&
                    <>
                        <div>ahoj</div>
                    </>
                    }
                </div>  
            </BodyBlock>
            <NewEventModal></NewEventModal>
        </div>
    );
}