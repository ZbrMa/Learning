import { BodyBlock, SectionHeader } from "../bodyBlock/bodyBlock";
import { Button } from "../../components/button/button";
import "./callToActionBlock.css";
import { ReferenceCard } from "../../components/referenceCard/referenceCard";
import { Link } from "react-router-dom";
import { InfoCard } from "../../components/infoCard/infoCard";
import { useEffect } from "react";
import { CountUp } from "../../components/countUp/countUp";

const images = [
  '/images/praha.jpg',
    '/images/busking.jpg',
    '/images/profilovy.jpg',
    '/images/brno.jpg',
]

export function CallToActionBlock() {

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
            <h2 className="cities--header h-top thick cities--title">Staň se součástí našeho světa!</h2>
            <div className="flex g-32">
            <InfoCard name="míst"><CountUp max={5} duration={1000} step={1}/></InfoCard>
            <InfoCard name="umělců"><CountUp max={200} duration={2000} step={2}/></InfoCard>
            <InfoCard name="akcí měsíčně"><CountUp max={150} duration={1500} step={2}/></InfoCard>
            </div>
            
          </div>
          
        </div>
      </BodyBlock>
      <BodyBlock color="black" id="action-call">
        <div className="call__action flex-col items-center">
          <h1 className="cap h-top thick tx-white">Jsi busker?</h1>
          <p className="text-center tx-lightGray">
          Ať už jsi umělec, nebo fanoušek pouličního umění, naše platforma je tu pro tebe. Přidej se k nám a vytvářejme společně nezapomenutelné zážitky!
          </p>
          <Button className="bold xbold fit"><Link to={'/app/register'}>Chci být součástí</Link></Button>
        </div>
      </BodyBlock>
    </>
  );
}
