import { BodyBlock, SectionHeader } from "../bodyBlock/bodyBlock";
import { Button } from "../../components/button/button";
import "./callToActionBlock.css";
import { ReferenceCard } from "../../components/referenceCard/referenceCard";
import { Link } from "react-router-dom";

export function CallToActionBlock() {
  return (
    <>
      <BodyBlock color="grey">
        <div className="reference">
        <SectionHeader>Komunita</SectionHeader>
          <ReferenceCard title="FrantaArt" image="/images/profilovy.jpg">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vestibulum
            fermentum tortor id mi. Maecenas aliquet accumsan leo. Praesent id
            justo in neque elementum ultrices. Phasellus faucibus molestie nisl.
            Nullam eget nisl. Curabitur bibendum justo non orci. Integer
            malesuada. Praesent vitae arcu tempor neque lacinia pretium. Vivamus
            luctus egestas leo.
          </ReferenceCard>
        </div>
      </BodyBlock>
      <BodyBlock color="black">
        <div className="call__action flex-col items-center">
          <h1 className="h-xl xbold tx-white">Jsi busker?</h1>
          <p className="text-center tx-gray">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vestibulum
            fermentum tortor id mi. Maecenas aliquet accumsan leo. Praesent id
            justo in neque elementum ultrices. Phasellus faucibus molestie nisl.
            Nullam eget nisl. Curabitur bibendum justo non orci. Integer
            malesuada. Praesent vitae arcu tempor neque lacinia pretium. Vivamus
            luctus egestas leo.
          </p>
          <Button className="bold xbold fit"><Link to={'/register'}>Chci být součástí</Link></Button>
        </div>
      </BodyBlock>
    </>
  );
}
