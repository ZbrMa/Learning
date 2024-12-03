import { CityCard } from "../../components/bigCard/cityCard";
import { BodyBlock, SectionHeader } from "../bodyBlock/bodyBlock";
import { Button } from "../../components/button/button";
import { Highlight } from "../../components/highlight/highlight";
import "./intro.css";

export function IntroBlock() {
  return (
      <BodyBlock>
        <div className="grid-2 g-128">
          <div className="flex-col content-space">
            <h2 className="cities--header h-top thick cities--title mb-32">Úvod</h2>
            <p>Naším cílem je podpořit pouliční umělce a propojit je s diváky. Díky našemu projektu mohou umělci snadno najít místa pro svá vystoupení, zatímco návštěvníci mohou objevovat nové talenty a užít si kulturu přímo na ulicích.</p>
          </div>
          <div className="flex-col g-32">
            <p className="h-xl xbold tx-gray">Poznejte <Highlight>živé umění</Highlight> v pulzujících <Highlight>ulicích města</Highlight>. Podpořte umělce a staňte se součástí <Highlight>komunity</Highlight>.</p>
            <Button variant='ternary' style={{marginTop:'64px'}}>Více o projektu</Button>
          </div>
        </div>
      </BodyBlock>
  );
}
