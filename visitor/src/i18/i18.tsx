import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import csCommon from "../locales/cs/common.json"
import csHome from "../locales/cs/home.json";
import csEvents from "../locales/cs/events.json";
import csUser from "../locales/cs/user.json";
import deCommon from "../locales/de/common.json";
import deHome from "../locales/de/home.json";
import deEvents from "../locales/de/events.json";
import deUser from "../locales/de/user.json";
import enCommon from "../locales/en/common.json";
import enHome from "../locales/en/home.json";
import enEvents from "../locales/en/events.json";
import enUser from "../locales/en/user.json";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reduxStore';
import { useEffect } from 'react';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common:enCommon,
        home:enHome,
        events:enEvents,
        user:enUser
      },
      cs: {
        common:csCommon,
        home:csHome,
        events:csEvents,
        user:csUser
      },
      de: {
        common:deCommon,
        home:deHome,
        events:deEvents,
        user:deUser
      },
    },
    lng: 'en',
    fallbackLng: 'de',
    ns: ['common', 'home','events','user'],
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
