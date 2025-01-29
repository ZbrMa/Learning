import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import './features.css';

export function Features(){

    return(
        <div className="features g-32">
            <FeatureItem title="Plánuj" icon={<RiCalendarScheduleLine/>}>Organizuj si svá vystoupení. Vyber si čas a místo, které ti vyhovuje.</FeatureItem>
                <span className="horizontal--separator"></span>
                <FeatureItem title="Komunikuj" icon={<MdGroups/>}>Komunikuj s naším týmem nebo ostatními buskery a navazuj tak vzathy a spolupráce.</FeatureItem>
                <span className="horizontal--separator"></span>
                <FeatureItem title="Vystupuj" icon={<PiMicrophoneFill/>}>Ukaž všm, co v tobě. Rozpohybuj ulice. Staň se součástí scény.</FeatureItem>
        </div>
    );
};

type FeatureItemProps = {
    children:React.ReactNode,
    title:string,
    icon:React.ReactNode,
}

function FeatureItem({children,title,icon}:FeatureItemProps) {

    return(
        <div className="feature__item flex g-16">
            {icon}
            <div className="tx-gray">
                <h3 className="xbold h-md mb-8">{title}</h3>
                {children}
            </div> 
        </div>
    )
};