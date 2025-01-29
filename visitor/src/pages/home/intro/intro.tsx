
import { BodyBlock } from "../../../ui/common/bodyBlock/bodyBlock";
import "./intro.css";
import { CountUp } from "../../../ui/components/countUp/countUp";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export function IntroBlock() {
  const {t} = useTranslation('home');

  return (
    <BodyBlock id="intro" variant="full">
        <div className="grid-3">
          <IntroCard icon={<RxCounterClockwiseClock/>}>
            <h2 className="h-xl xbold mb-16"><CountUp max={2568} duration={1000} step={50} /></h2>
            <p>{t("intro.hours")}</p>
          </IntroCard>
          <IntroCard icon={<HiOutlineMicrophone/>} color="black">
            <h2 className="h-xl xbold mb-16"><CountUp max={1120} duration={1000} step={30} /></h2>
            <p>{t("intro.events")}</p>
          </IntroCard>
          <IntroCard icon={<IoPersonOutline/>} color="gray">
            <h2 className="h-xl xbold mb-16"><CountUp max={214} duration={1000} step={5} /></h2>
            <p>{t("intro.users")}</p>
          </IntroCard>
        </div>
    </BodyBlock>
  );
}


type IntroCardProps = {
  children:React.ReactNode,
  icon:React.ReactNode,
  color?:'red'|'black'|'gray'|'white'
}

function IntroCard({children,icon,color='red'}:IntroCardProps){

  return(
    <div className={`intro__card box w-full g-32 ${color}`}>
      {icon}
      <div className="intro__card__text">
        {children}
      </div>
    </div>
  );
};