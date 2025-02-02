import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import './features.css';
import { useTranslation } from "react-i18next";

export function Features(){

    const { t } = useTranslation('home');

    return(
        <div className="features g-32">
            <FeatureItem title={t("features.plan.title")} icon={<RiCalendarScheduleLine/>}>{t("features.plan.text")}</FeatureItem>
                <span className="horizontal--separator"></span>
                <FeatureItem title={t("features.community.title")} icon={<MdGroups/>}>{t("features.community.text")}</FeatureItem>
                <span className="horizontal--separator"></span>
                <FeatureItem title={t("features.perform.title")} icon={<PiMicrophoneFill/>}>{t("features.perform.text")}</FeatureItem>
        </div>
    );
};

type FeatureItemProps = {
    children:React.ReactNode,
    title:string,
    icon:React.ReactNode,
}

function FeatureItem({children,title,icon}:FeatureItemProps) {

    return(
        <div className="feature__item flex g-16">
            {icon}
            <div className="tx-gray">
                <h3 className="xbold h-md mb-8">{title}</h3>
                {children}
            </div> 
        </div>
    )
};