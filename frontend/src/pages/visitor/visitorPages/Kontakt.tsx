import { IoLogoInstagram, IoMailOutline } from "react-icons/io5";
import { BodyBlock } from "../../../ui/blocks/common/bodyBlock/bodyBlock";
import { ProfileInfoLine } from "../../../ui/blocks/userPage/userPage";
import { VisitorLayout } from "../visitorLayout";
import { HiPhone } from "react-icons/hi2";
import { useTranslation } from 'react-i18next'; // Import hooku pro překlady

export function KontaktPage() {
  const { t } = useTranslation('visitor'); // Použití hooku pro získání funkce t

  return (
    <VisitorLayout>
      <BodyBlock>
        <div className="grid-2 g-128">
          <div>
            <h3 className="h-lg xbold mb-32">{t('contactPage.hasQuestion')}</h3>
            <ProfileInfoLine title={t('contactPage.email')} icon={<IoMailOutline />}>
              busking.team@busking.com
            </ProfileInfoLine>
            <ProfileInfoLine title={t('contactPage.phone')} icon={<HiPhone />}>
              875 321 465
            </ProfileInfoLine>
            <ProfileInfoLine title={t('contactPage.instagram')} icon={<IoLogoInstagram />}>
              busking|team
            </ProfileInfoLine>
          </div>
          <div>
            {t('contactPage.contactForm')}
          </div>
        </div>
      </BodyBlock>
    </VisitorLayout>
  );
}
