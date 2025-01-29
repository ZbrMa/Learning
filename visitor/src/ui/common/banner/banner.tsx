
import { useTranslation } from 'react-i18next';
import './banner.css';
//import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";

export function Banner() {

  const {t} = useTranslation('home');

  return (
    <div className="banner">
      <video autoPlay muted loop className='banner--video'>
        <source src="/images/baner.mp4" type="video/mp4" />
        Váš prohlížeč nepodporuje video.
      </video>
      <div className='banner--overlay'></div>
      <div className="banner__inner">
        <div className="banner__text text-center">
          <h1 className='h-top xbold tx-white banner--title pb-16'>{t('banner.title')}</h1>
          <p className='tx-md med tx-white'>{t('banner.description')}</p>
        </div>
        {/* Volitelně: Sekce pro sociální média */}
        {/* <div className="soc__container">
          <span className='soc--line'></span>
          <span className='soc-text'>{t('banner.banner.followUs')}</span>
          <IoLogoFacebook />
          <IoLogoInstagram />
          <IoLogoYoutube />
        </div> */}
      </div>
    </div>
  );
}
