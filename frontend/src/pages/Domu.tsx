import { BodyBlock } from "../components/common/bodyBlock";
import { Banner } from "../components/common/banner";
import {useApiGet,useApiGetNoParams} from "../useApi/useApi";
import { IEvent, INews } from "../types/types";
import { EventsGrid } from "../components/common/eventsGrid";
import { EventFilter } from "../components/common/eventFilter";
import { useState } from "react";
import { LastNews } from "../components/specific/lastNews";
import { BlockTitle } from "../components/common/blockTitle";
import { Slider } from "../components/common/slider";


export function Domu() {

    const [filters,setFilters] = useState<{}>({});

    const returnFilters = (filter:{}) => {
        setFilters(filter);
    };
    
    const { data: events, loading, error } = useApiGet<IEvent[]>('/get_event', filters);
    const { data: news, loading:newsLoading, error:newsError } = useApiGetNoParams<INews[]>('/get_news');

    return (
        <div className="page">
            <Banner
                banners={[
                    {image: "/assets/imgs/valassko.jpg", title: "Objev Valašsko" , text: `Camet, consectetuer adipiscing elit. Quisque porta.
                    Praesent id justo in neque elementum ultrices. Pellentesque arcu.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Mauris metus. In rutrum.`},
                    {image: "/assets/imgs/folklor1.jpg", title: "Zažij Valašsko" , text: `Camet, consectetuer adipiscing elit. Quisque porta.
                    Praesent id justo in neque elementum ultrices. Pellentesque arcu.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Mauris metus. In rutrum.`},
                    {image: "/assets/imgs/krasnopivo.jpg", title: "Ochutnej Valašsko" , text: `Camet, consectetuer adipiscing elit. Quisque porta.
                    Praesent id justo in neque elementum ultrices. Pellentesque arcu.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Mauris metus. In rutrum.`},
                    {image: "/assets/imgs/bezky.jpg", title: "Valašsko v zimě" , text: `Camet, consectetuer adipiscing elit. Quisque porta.
                    Praesent id justo in neque elementum ultrices. Pellentesque arcu.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Mauris metus. In rutrum.`},
                    {image: "/assets/imgs/skanzen.jpg", title: "Historické valašsko" , text: `Camet, consectetuer adipiscing elit. Quisque porta.
                    Praesent id justo in neque elementum ultrices. Pellentesque arcu.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Mauris metus. In rutrum.`},
                ]}
            />
            <BodyBlock>
                <BlockTitle text="Nadcházející akce"></BlockTitle>
                <Slider slidedObject={events}></Slider>
            </BodyBlock>
            <BodyBlock color="secondary">
                <BlockTitle text="Novinky"></BlockTitle>
                <LastNews dataSet={news}></LastNews>
            </BodyBlock>
            <BodyBlock>
                <BlockTitle text="Najdi svou událost"></BlockTitle>
                <EventFilter getFilter={returnFilters}></EventFilter>
            </BodyBlock>
            <BodyBlock color="secondary">
                <EventsGrid dataSet={events}></EventsGrid>
            </BodyBlock>

            
        </div>
    );

}
