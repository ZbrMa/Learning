import { useTranslation } from "react-i18next";
import { InfoLine } from "../../../../../ui/components/infoLine/infoLine";


export function UserContact() {
    const {t:tApp} = useTranslation('app');

    return(
        <div className="app__home__contact">
            <h3 className="h-sm xbold mb-16">{tApp("home.contact.header")}</h3>
            <InfoLine title={tApp("home.contact.phone")}>987654321</InfoLine>
            <InfoLine title={tApp("home.contact.email")}>busking@busking.com</InfoLine>
            <InfoLine title={tApp("home.contact.address")}>Třída kapitána Jaroše 78</InfoLine>
        </div>
    );
};