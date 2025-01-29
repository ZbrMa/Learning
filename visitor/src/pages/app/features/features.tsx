import { BodyBlock, MainHeader } from '../../../ui/common/bodyBlock/bodyBlock';
import './features.css';
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";

export function Features() {

    return(
        <BodyBlock id="app-features">
            <MainHeader>K čemu appku?</MainHeader>
            <p className="app--text tx-gray text-center mt-32 mb-64 tx-sm">Naše aplikace spojuje buskery v jednom prostoru, kde mohou snadno plánovat a sdílet svá vystoupení. Pomáhá nejen zefektivnit čas, ale také rozvíjet komunitu.</p>
            <div className="features__items flex w-full">
                <FeatureItem header="Plánuj" img={<RiCalendarScheduleLine/>}>Organizuj si svá vystoupení. Vyber si čas a místo, které ti vyhovuje.</FeatureItem>
                <span className="horizontal--separator"></span>
                <FeatureItem header="Komunikuj" img={<MdGroups/>}>Komunikuj s naším týmem nebo ostatními buskery a navazuj tak vzathy a spolupráce.</FeatureItem>
                <span className="horizontal--separator"></span>
                <FeatureItem header="Vystupuj" img={<PiMicrophoneFill/>}>Ukaž všm, co v tobě. Rozpohybuj ulice. Staň se součástí scény.</FeatureItem>
            </div>
        </BodyBlock>
    )

};

type FeatureItemProps = {
    header:string,
    children:React.ReactNode,
    img:React.ReactNode,
}

function FeatureItem({header,children,img}:FeatureItemProps) {
    return(
        <div className="feature__item flex-col items-center g-16 px-64">
            {img}
            <h3 className="xbold h-md">{header}</h3>
            <p className="tx-sm text-center tx-gray">{children}</p>
        </div>
    )
};