import { BodyBlock,MainHeader } from "../../../ui/common/bodyBlock/bodyBlock";
import "./callToActionBlock.css";
import { Link } from "react-router-dom";
import { GetNewUserActionBlock } from "../../../ui/components/community/community";
import { IoArrowForwardOutline, IoLogoFacebook, IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import { Separator } from "../../../ui/components/separator/separator";
import { Highlight } from "../../../ui/components/highlight/highlight";
import { useTranslation, Trans } from "react-i18next";

export function CallToActionBlock() {

  const {t} = useTranslation('home');

  return (
    <>
    <BodyBlock id="follow" variant="full">
       <div className="follow__block h-full relative">
 
          <MainHeader>{t("actionCall.follow")}</MainHeader>
          <Separator/>
          <div className="follow__socials flex g-32 content-center mt-32">
            <IoLogoInstagram/>
            <IoLogoYoutube/>
            <IoLogoFacebook/>
            <IoLogoTiktok/>
        </div>
        </div> 
    </BodyBlock>
      <BodyBlock id="community">
        <div className="cities__text">
                <MainHeader>{t("actionCall.joinCommunity.header")}</MainHeader>
                <p className="tx-gray tx-lg mt-64">
                <Trans
                  i18nKey="actionCall.joinCommunity.text"
                  ns="home"
                  values={{ talent: t("actionCall.joinCommunity.talent"),
                    dream: t("actionCall.joinCommunity.dream"),
                    energy: t("actionCall.joinCommunity.energy")
                  }}
                  components={{
                    1: <Highlight>{t("actionCall.joinCommunity.talent")}</Highlight>,
                    2: <Highlight>{t("actionCall.joinCommunity.dream")}</Highlight>,
                    3: <Highlight>{t("actionCall.joinCommunity.energy")}</Highlight>
                  }}
                >
                </Trans>
         
      </p>
              </div>
      </BodyBlock>
      <BodyBlock color="grey" id="action-call">
        <div className="flex-col g-128">
          <GetNewUserActionBlock watermark={t("actionCall.buskerJoin.watermark1")} header={t("actionCall.buskerJoin.header1")} btn={<a href="https://app.buskup.com">{t("actionCall.buskerJoin.button")}<IoArrowForwardOutline/></a>}>{t("actionCall.buskerJoin.text")}</GetNewUserActionBlock>
          <GetNewUserActionBlock watermark={t("actionCall.buskerJoin.watermark2")} header={t("actionCall.buskerJoin.header2")}  variant="right" btn={<Link to='/events'>{t("actionCall.buskerJoin.events")}<IoArrowForwardOutline/></Link>}>{t("actionCall.buskerJoin.text")}</GetNewUserActionBlock>
        </div>
      </BodyBlock>
    </>
  );
}
