import {
  IoClose,
  IoLogOutOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { Button, IconButton } from "../../../components/button/button";
import { DropdownMenu } from "../../../components/dropdownMenu/dropdownMenu";
import "./menu.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reduxStore";
import { logout } from "../../../../api/authSlice";
import { LuPlus } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { setLang } from "../../../../redux/languageSlice";
import { useTranslation } from 'react-i18next';

type MenuProps = {
  variant?: "def" | "sec";
};

export function Menu({ variant = "def" }: MenuProps) {
  const { t } = useTranslation('common');
  const { token, role, id } = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { lang } = useSelector((root: RootState) => root.lang);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("tokenExpiry");
    navigate("/");
  };

  const checkScroll = () => {
    const pos = window.scrollY;

    if (pos > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLangChange = (e: string) => {
    dispatch(setLang(e));
  };

  return (
    <header
      className={`${scroll ? "scrolled" : ""} ${variant} ${
        isMobileMenuOpen ? "mobile" : ""
      }`}
    >
      <img src="/images/logo.png" className="logo" />

      <IconButton
        onClick={toggleMobileMenu}
        variant={`${isMobileMenuOpen ? "ternary" : "red"}`}
        style={{ marginTop: `${isMobileMenuOpen ? "32px" : ""}` }}
        className="ham--menu"
      >
        {isMobileMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
      </IconButton>

      <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="nav__inner">
          <ul className="nav__items">
            <li className="nav--link">
              <Link to="/">{t('button.home')}</Link>
            </li>
            <li className="nav--link">
              <Link to="/events">{t('button.events')}</Link>
            </li>
            <li className="nav--link">
              <Link to="/about">{t('button.about')}</Link>
            </li>
            <li className="nav--link">
              <Link to="/contact">{t('button.contact')}</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="nav__right">
        <DropdownMenu
          options={[
            { label: "cs", onClick: () => handleLangChange('cs') },
            { label: "en", onClick: () => handleLangChange('en') },
            { label: "de", onClick: () => handleLangChange('de') }
          ]}
        >
          <IconButton
            variant="secondary"
            style={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {lang}
          </IconButton>
        </DropdownMenu>
        <DropdownMenu
          options={
            token
              ? role === 2
                ? [
                    {
                      label: t("button.profile"),
                      link: `/app/profile/${id}`,
                      optionIcon: <IoPersonOutline />,
                    },
                    {
                      label: t("button.notifications"),
                      link: `/app/mail`,
                      optionIcon: <IoMailOutline />,
                    },
                    {
                      label: t("button.myCalendar"),
                      link: `/app/calendar`,
                      optionIcon: <IoCalendarOutline />,
                    },
                    {
                      label: t("button.logout"),
                      onClick: handleLogout,
                      optionIcon: <IoLogOutOutline />,
                    },
                  ]
                : [{ label: t("button.logout"), onClick: handleLogout }]
              : [
                  { label: t("button.login"), link: "/app/login" },
                  { label: t("button.register"), link: "/app/register" },
                ]
          }
        >
          <IconButton variant="secondary">
            <IoPersonOutline />
          </IconButton>
        </DropdownMenu>

        {token ? (
          role === 2 ? (
            <Link to="/app/findSpot">
              <Button>
                <IoCalendarOutline />
                {t("button.findEvent")}
              </Button>
            </Link>
          ) : (
            <Link to="/app/adminPage/events">
              <Button>
                <IoCalendarOutline />
                {t("button.admin")}
              </Button>
            </Link>
          )
        ) : (
          <Link to="/app/register" className="xbold">
            <Button>
              <LuPlus />
              {t("button.join")}
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
