import './banner.css';
import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";

export function Banner(){

    return(
        <div className="banner">
            <video autoPlay muted loop className='banner--video'>
                <source src="/images/baner.mp4" type="video/mp4"/>
                Váš prohlížeč nepodporuje video.
            </video>
            <div className='banner--overlay'></div>
            <div className="banner__inner">
                <div className="banner__text">
                <h1 className='h-top xbold tx-white banner--title pb-16'>Busking.</h1>
                <p className='tx-md med tx-white'>Objev umění ulice – Přidej se k pulzující komunitě!</p>
                </div>
                {/*<div className="soc__container">
                    <span className='soc--line'></span>
                    <span className='soc-text'>Sleduj nás</span>
                    <IoLogoFacebook/>
                    <IoLogoInstagram/>
                    <IoLogoYoutube/>
                </div>*/}
            </div>
        </div>
    );
};