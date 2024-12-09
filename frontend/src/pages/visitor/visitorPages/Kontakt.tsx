import { IoLogoInstagram, IoMailOutline } from "react-icons/io5";
import { BodyBlock } from "../../../ui/blocks/bodyBlock/bodyBlock";
import { ProfileInfoLine } from "../../../ui/blocks/userPage/userPage";
import { InfoLine } from "../../../ui/components/infoLine/infoLine";
import { VisitorLayout } from "../visitorLayout";
import { HiPhone } from "react-icons/hi2";


export function KontaktPage(){


    return(
        <VisitorLayout>
            <BodyBlock>
                <div className="grid-2 g-128">
                    <div>
                        <h3 className="h-lg xbold mb-32">Máš dotaz?</h3>
                        <ProfileInfoLine title="E-mail" icon={<IoMailOutline/>}>busking.team@busking.com</ProfileInfoLine>
                        <ProfileInfoLine title="Telefon" icon={<HiPhone/>}>875 321 465</ProfileInfoLine>
                        <ProfileInfoLine title="Instagram" icon={<IoLogoInstagram/>}>busking|team</ProfileInfoLine>
                    </div>
                    <div>
                        Kontaktní formulář
                    </div>
                </div>
            </BodyBlock>
        </VisitorLayout>
    );
};