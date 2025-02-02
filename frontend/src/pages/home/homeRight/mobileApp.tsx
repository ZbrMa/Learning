import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/components/button/button";
import { PiAppStoreLogo, PiGooglePlayLogo } from "react-icons/pi";

export function MobileApp(){

    const { t } = useTranslation('home');

    return(
        <div className="mobile__app pt-32 flex g-16 items-center">
            <span className="bold">{t("tryMobile")}</span>
            <div className="flex g-16">
                <Button variant="secondary" size="small" disabled><PiGooglePlayLogo/>Google play</Button>
                <Button variant="secondary" size="small" disabled><PiAppStoreLogo/>App store</Button>
            </div>
        </div>
    );
};