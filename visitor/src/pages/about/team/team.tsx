import { BodyBlock,MainHeader } from '../../../ui/common/bodyBlock/bodyBlock';
import { TeamCard } from '../../../ui/components/teamCard/teamCard';
import './team.css';

export function Team(){


    return (
        <BodyBlock id="team" color="black">
            <div className="team__grid">
                <div className="team__left">
                    <MainHeader>Náš tým</MainHeader>
                    <p className="mt-32 tx-gray">Za naším projektem stojí tým nadšených kreativců, kteří věří v sílu pouličního umění a komunitního zážitku. Jsme skupina, která propojuje umělce s jejich publikem.</p>
                </div>
                <div className="team__cards relative">
                    <TeamCard img="/images/profilovy.jpg" name="Ingrid Gustavsson" role="Koordinátorka"/>
                    <TeamCard img="/images/busking.jpg" name="Fredy Apple" role="Kuchař"/>
                    <TeamCard img="/images/parallax.webp" name="Janek Černý" role="PR master"/>
                    <TeamCard img="/images/profilovy.jpg" name="Ingrid Gustavsson" role="Koordinátorka"/>
                </div>
            </div>
            
           
        </BodyBlock>
    );
};