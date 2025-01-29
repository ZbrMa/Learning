import { BodyBlock } from "../../../ui/common/bodyBlock/bodyBlock";
import { CiMobile1 } from "react-icons/ci";
import './appSteps.css';
import { Button } from "../../../ui/components/button/button";

export function AppSteps() {

    return(
        <BodyBlock id="app-steps">
            <AppStep title="Stáhni si aplikaci do mobilu nebo použij webovou verzi" img={<CiMobile1/>}>
            <div>
                <p className="tx-gray mb-32">V tuto chvíli máme k dispozici pouze webovou aplikaci</p>
                <a href="https://app.buskup.com"><Button variant="secondary">Do apliakce</Button></a>
            </div>
                
            </AppStep>
        </BodyBlock>
    );
};

type AppStepProps = {
    children: React.ReactNode,
    title:string,
    img:React.ReactNode,
}

function AppStep({children,title,img}:AppStepProps) {

    return(
        <div className={`app__step`}>
            {img}
            
                <h3 className="xbold h-xl">{title}</h3>
                {children}
            
            
        </div>  
    );

};