import { BodyBlock } from "../../common/bodyBlock/bodyBlock";
import { Button } from "../../../components/button/button";
import "./callToActionBlock.css";
import { Link } from "react-router-dom";
import { InfoCard } from "../../../components/infoCard/infoCard";
import { CountUp } from "../../../components/countUp/countUp";
import { useTranslation } from "react-i18next";

const images = [
  '/images/praha.jpg',
    '/images/busking.jpg',
    '/images/profilovy.jpg',
    '/images/brno.jpg',
]

export function CallToActionBlock() {
  const { t } = useTranslation('visitor');

  return (
    <>
      <BodyBlock color="grey" id="comunity">
        <div className="comunity">
          {/*<ReferenceCard title="FrantaArt" image="/images/profilovy.jpg">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vestibulum
            fermentum tortor id mi. Maecenas aliquet accumsan leo. Praesent id
            justo in neque elementum ultrices. Phasellus faucibus molestie nisl.
            Nullam eget nisl. Curabitur bibendum justo non orci. Integer
            malesuada. Praesent vitae arcu tempor neque lacinia pretium. Vivamus
            luctus egestas leo.
          </ReferenceCard>*/}
          <div className="comunity__gallery">
            {images.map((image,index)=>(
              <img src={image} key={image+index}/>
            ))}
          </div>
          <div className="flex-col g-32 content-center">
            <h2 className="action--header h-top thick cities--title">{t('homePage.actionCall.joinCommunity.header')}</h2>
            <div className="flex g-32">
            <InfoCard name={t('homePage.actionCall.joinCommunity.cards.places')}><CountUp max={5} duration={1000} step={1}/></InfoCard>
            <InfoCard name={t('homePage.actionCall.joinCommunity.cards.artists')}><CountUp max={200} duration={1500} step={5}/></InfoCard>
            <InfoCard name={t('homePage.actionCall.joinCommunity.cards.eventsPerMonth')}><CountUp max={150} duration={1500} step={5}/></InfoCard>
            </div>
            
          </div>
          
        </div>
      </BodyBlock>
      <BodyBlock color="black" id="action-call">
        <div className="call__action flex-col items-center">
          <h1 className="cap h-top thick tx-white">{t('homePage.actionCall.buskerJoin.header')}</h1>
          <p className="text-center tx-lightGray">
          {t('homePage.actionCall.buskerJoin.text')}
          </p>
          <Button className="bold xbold fit"><Link to={'/app/register'}>{t('homePage.actionCall.buskerJoin.button')}</Link></Button>
        </div>
      </BodyBlock>
    </>
  );
}
