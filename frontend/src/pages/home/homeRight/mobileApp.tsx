import { Button } from "../../../ui/components/button/button";
import { PiAppStoreLogo, PiGooglePlayLogo } from "react-icons/pi";

export function MobileApp(){

    return(
        <div className="mobile__app pt-32 flex g-16 items-center">
            <span className="bold">Vyzkoušej i naši mobilní aplikaci</span>
            <div className="flex g-16">
                <Button variant="secondary" size="small" disabled><PiGooglePlayLogo/>Google play</Button>
                <Button variant="secondary" size="small" disabled><PiAppStoreLogo/>App store</Button>
            </div>
        </div>
    );
};