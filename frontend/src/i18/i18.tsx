import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enVisit from '../assets/en/enTransVisitor.json';
import csVisit from '../assets/cs/csTransVisitor.json';
import deVisit from '../assets/de/deTransVisitor.json';
import enCommon from '../assets/en/enCommon.json';
import csCommon from '../assets/cs/csCommon.json';
import deCommon from '../assets/de/deCommon.json';
import enLogReg from '../assets/en/logReg.json';
import csLogReg from '../assets/cs/logReg.json';
import deLogReg from '../assets/de/logReg.json';
import enApp from '../assets/en/app.json';
import csApp from '../assets/cs/app.json';
import deApp from '../assets/de/app.json';
import csHome from '../assets/cs/home.json';
import enHome from '../assets/en/home.json';
import deHome from '../assets/de/home.json';
import csModals from '../assets/cs/modals.json';
import enModals from '../assets/en/modals.json';
import deModals from '../assets/de/modals.json';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reduxStore';
import { useEffect } from 'react';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        visitor: enVisit,
        common: enCommon,
        logReg:enLogReg,
        app: enApp,
        home:enHome,
        modals:enModals,
      },
      cs: {
        visitor: csVisit,
        common: csCommon,
        logReg:csLogReg,
        app: csApp,
        home:csHome,
        modals:csModals,
      },
      de: {
        visitor: deVisit,
        common: deCommon,
        logReg:deLogReg,
        app: deApp,
        home:deHome,
        modals:deModals,
      },
    },
    lng: 'en',
    fallbackLng: 'de',
    ns: ['visitor', 'common', 'logReg','app','home','modals'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

export function I18Provider ({children}:{children:React.ReactNode}) {
    const dispatch = useDispatch();
    const {lang} = useSelector((root:RootState)=>root.lang);

    useEffect(() => {
        if (lang) {
          i18n.changeLanguage(lang);
        }
      }, [lang, dispatch]);
    
      return <>{children}</>;
};
