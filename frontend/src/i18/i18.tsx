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
      },
      cs: {
        visitor: csVisit,
        common: csCommon,
        logReg:csLogReg,
      },
      de: {
        visitor: deVisit,
        common: deCommon,
        logReg:deLogReg,
      },
    },
    lng: 'cs',
    fallbackLng: 'en',
    ns: ['visitor', 'common', 'logReg'],
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
