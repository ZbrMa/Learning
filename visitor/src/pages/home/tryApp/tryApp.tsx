
import { BodyBlock,MainHeader } from "../../../ui/common/bodyBlock/bodyBlock";
import "./tryApp.css";
import { Button } from "../../../ui/components/button/button";
import { GrAppsRounded } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function TryApp() { 

  const {t} = useTranslation('home');

  return (
    <BodyBlock id="try-app" >
      <div className="grid-2">
        <div>
          <MainHeader>{t("tryApp.header")}</MainHeader>
          <p className="my-32 tx-white">{t("tryApp.text")}</p>
          <Link to="/app"><Button id="try-app-btn">{t("tryApp.button")}</Button></Link>
        </div>
        <GrAppsRounded/>
      </div>
      
      
    </BodyBlock>
  );
}
