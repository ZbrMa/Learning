import { IoClose } from "react-icons/io5";
import { Button, IconButton } from "../../components/button/button";
import "./menu.css";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { LangSwitcher } from "./langSwitcher";
import { useTranslation } from "react-i18next";

type MenuProps = {
  variant?: "def" | "sec";
};

export function Menu({ variant = "def" }: MenuProps) {
  const {t }= useTranslation("common");
  const [scroll, setScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Kontrola scrollování
  const checkScroll = () => {
    const pos = window.scrollY;
    setScroll(pos > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  // Tlačítko pro otevření mobilního menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`${scroll ? "scrolled" : ""} ${variant} ${isMobileMenuOpen ? "mobile" : ""}`}
    >
      <img className="logo" src="/images/logo.png" alt="logo"/>

      <IconButton
        onClick={toggleMobileMenu}
        variant="primary"
        
        id="ham--menu"
      >
        {isMobileMenuOpen ? <IoClose /> : <IoMenuOutline />}
      </IconButton>

      <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="nav__inner">
          <ul className="nav__items">
            <li className="nav--link">
              <Link to="/" onClick={toggleMobileMenu}>{t("menu.home")}</Link>
            </li>
            <li className="nav--link">
              <Link to="/events"  onClick={toggleMobileMenu}>{t("menu.events")}</Link>
            </li>
            <li className="nav--link">
              <Link to="/about"  onClick={toggleMobileMenu}>{t("menu.about")}</Link>
            </li>
            <li className="nav--link">
              <Link to="/app"  onClick={toggleMobileMenu}>{t("menu.app")}</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="nav__right">
        <LangSwitcher/>
        <a href="https://app.buskup.com" className="xbold" id="header--join">
          <Button>
            <LuPlus />
            {t("menu.join")}
          </Button>
        </a>
      </div>
    </header>
  );
}
