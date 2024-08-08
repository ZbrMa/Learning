import { BodyBlock } from "../components/common/bodyBlock";
import { Button } from "../components/common/button";
import { Teaser } from "../components/common/teaser";
import { Banner } from "../components/common/banner";
import { useModal } from "../context/modalContext";
import { BlockTitle } from "../components/common/blockTitle";
import { EventFilter } from "../components/common/eventFilter";
import { EventsGrid } from "../components/common/eventsGrid";
import { useState } from "react";
import { useApiGet } from "../useApi/useApi";
import { IEvent } from "../types/types";

export function Registrace() {

    const { openModal } = useModal();
    const [filters,setFilters] = useState<{}>({});

    const returnFilters = (filter:{}) => {
        setFilters(filter);
    };
    
    const { data: events, loading:eventsLoading, error } = useApiGet<IEvent[]>('/get_event', filters);

    return (
        <div className="page">
            <Banner
                banners={[
                    {image: "/assets/imgs/krasnopivo.jpg", title: "Staň se součástí Valašska" , text: `Camet, consectetuer adipiscing elit. Quisque porta.
                    Praesent id justo in neque elementum ultrices. Pellentesque arcu.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Mauris metus. In rutrum.`},
                ]}
            />
            <BodyBlock>
                <Teaser>Chceš se stát součástí valašské kultury? Najdi si termín, který ti sedí a přihlaš se na něj. Nemáš účet? 
                    Vytvoř si ho, přihlašování termínů bude pak jednodušší.
                </Teaser>
                <Button variant="default" click={()=>openModal('registerModal')}>Chci vytvořit účet</Button>
            </BodyBlock>
            <BodyBlock color="secondary">
                <BlockTitle text="Jak na to?"></BlockTitle>
                <div>Camet, consectetuer adipiscing elit. Quisque porta.
                    Praesent id justo in neque elementum ultrices. Pellentesque arcu.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Mauris metus. In rutrum.</div>
            </BodyBlock>
            <BodyBlock>
                <BlockTitle text="Najdi svou událost"></BlockTitle>
                <EventFilter getFilter={returnFilters}></EventFilter>
            </BodyBlock>
            <BodyBlock color="secondary">
                {eventsLoading?
                    (
                        <div>Načítám</div>
                    ):(
                        <EventsGrid dataSet={events}></EventsGrid>
                )}
            </BodyBlock>
        </div>
    );

}
