import { Layout } from "../../ui/blocks/common/layout/layout";
import { Link } from "react-router-dom";
import { Button } from "../../ui/components/button/button";
import { LuPlus } from "react-icons/lu";
import "./home.css";
import { Features } from "./homeRight/features";
import { MobileApp } from "./homeRight/mobileApp";
import { HomeImages } from "./homeRight/homeImages";
import { useTranslation } from "react-i18next";
import { BsArrowRight } from "react-icons/bs";

export function Home() {
   const {t} = useTranslation("common");

  return (
    <Layout
        id="home-page"
      button={
        <div className="home__btns flex items-center g-16">
          
             <Link to="/login" className="xbold">
              <Button size="small">
                <BsArrowRight />
                {t("button.login")}
              </Button>
            </Link>
            <Link to="/register" className="xbold">
              <Button variant="secondary" size="small">
                <LuPlus />
                {t("button.register")}
              </Button>
            </Link>
            
        </div>
       
      }
      left={null}
      right={
        <div className="right">
          <Features/>
          <HomeImages/>
          <MobileApp/>
        </div>
        
      }
    />
  );
}
