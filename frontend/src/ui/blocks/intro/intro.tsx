import { CityCard } from "../../components/bigCard/cityCard";
import { BodyBlock, SectionHeader } from "../bodyBlock/bodyBlock";
import { Button } from "../../components/button/button";
import { Highlight } from "../../components/highlight/highlight";
import "./intro.css";

export function IntroBlock() {
  return (
    <>
      <BodyBlock>
        <div className="grid-2 g-128">
          <div className="flex-col content-space">
            <SectionHeader>Úvod</SectionHeader>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce aliquam vestibulum ipsum. Suspendisse sagittis ultrices augue.</p>
          </div>
          <div className="flex-col g-32">
            <p className="h-xl xbold tx-gray"><Highlight>Lorem</Highlight> ipsum dolor sit amet, consectetuer adipiscing <Highlight>elit</Highlight>. Fusce aliquam <Highlight>vestibulum</Highlight> ipsum.</p>
            <Button variant='ternary'>Více o projektu</Button>
          </div>
        </div>
      </BodyBlock>
      <BodyBlock variant="full">
        {/*<h1 className="xbold h-xl text-center mb-64">V jakých městech nás najdete?</h1>*/}
        <div className="flex cities__cards">
          <CityCard title="Brno" image="/images/brno.jpg">''Město studentů''</CityCard>
          <CityCard title="Praha" image="/images/praha.jpg">''Matka měst''</CityCard>
          <CityCard title="Olomouc" image="/images/olomouc.jpg">''Perla Hané''</CityCard>
        </div>
      </BodyBlock>
      {/*<BodyBlock variant='full' style={{paddingBottom:'0'}}>
        <div className="intro__cards">
          <BigCard image="/images/brno.jpg" title="Brno" subtitle="''Město studentů''" button={<Button variant='secondary'>Více o Brnu</Button>}>
          </BigCard>
          <BigCard image="/images/praha.jpg" title="Praha" subtitle="''Matka měst''" button={<Button variant='secondary'>Více o Praze</Button>}>
          </BigCard>
          <BigCard image="/images/olomouc.jpg" title="Olomouc" subtitle="''Perla Hané''" button={<Button variant='secondary'>Více o Olomouci</Button>}>
          </BigCard>
        </div>
      </BodyBlock>*/}
    </>
  );
}
