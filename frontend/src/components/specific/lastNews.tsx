import { INews } from "../../types/types";
import { LastNewsCard } from "../common/card";
import './styles/lastNews.css';

type Props = {
    dataSet:INews[] | null,
}

export function LastNews({dataSet}:Props){

    return (
        <>
            {dataSet? (
                <div className="last-news-container">
                    <div className="news-card top-left">
                        <LastNewsCard input={dataSet[0]} />
                    </div>
                    <div className="news-card top-middle">
                        <LastNewsCard input={dataSet[1]} />
                    </div>
                    <div className="news-card top-right">
                        <LastNewsCard input={dataSet[2]} />
                    </div>
                    <div className="news-card bottom-left">
                        <LastNewsCard input={dataSet[3]} />
                    </div>
                    <div className="news-card bottom-middle">
                        <LastNewsCard input={dataSet[4]} />
                    </div>
                    <div className="news-card bottom-right">
                        <LastNewsCard input={dataSet[5]} />
                    </div>
                </div>
            ) : (
                <div>Žádné události</div>
            )}
        </>
    );
    
}