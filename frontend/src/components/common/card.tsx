import { IEvent,INews } from "../../types/types"
import './styles/card.css'
import { useNavigate } from "react-router-dom";

type PropsEvent = {
    input:IEvent,
    cardType?:'default' | 'slider',
};

type PropsNews = {
    input:INews,
};

const monthsInCzech = [
    "led", "úno", "bře", "dub", "kvě", "čer", "čvc", "srp", "zář", "říj", "lis", "pro"
];

const formatDate = (dateString:Date) => {
    const date = new Date(dateString);

    const year = date.getFullYear().toString().slice(-2);
    const day = date.getDate();
    const month = monthsInCzech[date.getMonth()];

    return { year, day, month };
}

export function EventCard({input,cardType = 'default'}:PropsEvent) {

    const {year,month,day} = formatDate(input.day);

    const navigate = useNavigate();

    return(
        <div className={`card ${cardType === 'slider'? 'slider': ''}`} onClick={()=>navigate(`/event/${input.id}`)}>
            <div className="card-img">
                <img  src={`${input.image}`}></img>
                <div className="card-date">
                    <div className="card-day">
                        {day}.
                    </div>
                    <div className="card-month">
                        {month} {year}
                    </div>
                </div>
                <div className="card-info">
                    <div className="card-info-inner">
                        <div className="card-name">
                            {input.name}
                        </div>
                        <div className="card-genre">
                            {input.genre}
                        </div>
                        <div className="card-place">
                            {input.city}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export function LastNewsCard({input}: PropsNews){

    const date = new Date(input.day);

    return(
        <div className={`last-new-card`}>
            <div className="card-img">
                <img src={`${input.image}`}></img>
                <div className="news-date">
                        {date.getDate()}.{date.getMonth().toString()}.{date.getFullYear().toString()}
                </div>
                <div className="news-text">
                    <div className="news-text-inner">
                        <div className="news-title">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
                    </div>
                </div>

            </div>
        </div>
    );
}