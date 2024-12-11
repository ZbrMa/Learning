import { IoClose, IoLogOutOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { Button, IconButton } from "../../../components/button/button";
import { DropdownMenu } from "../../../components/dropdownMenu/dropdownMenu";
import "./menu.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/userStore";
import { logout } from "../../../../api/authSlice";
import { LuPlus } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

type MenuProps = {
  variant?: "def" | "sec";
};

export function Menu({ variant = "def" }: MenuProps) {
  const {token,role,id} = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  // Stav pro ovládání otevření/zavření menu na mobilu
  const navigate = useNavigate();

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

  // Toggle pro zobrazení menu na mobilu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`${scroll ? "scrolled" : ""} ${variant} ${isMobileMenuOpen ? "mobile" : ""}`}
    >
      <img src="/images/logo.png" className="logo" />
      
      {/* Tlačítko hamburger, zobrazuje se pouze na mobilu */}
      <IconButton onClick={toggleMobileMenu} variant='red' style={{marginTop:`${isMobileMenuOpen? '32px':''}`}}>
        {isMobileMenuOpen ? (
          <IoClose/>
          ):(
          <GiHamburgerMenu/>
          )}
      </IconButton>

      <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="nav__inner">
          <ul className="nav__items">
            <li className="nav--link">
              <Link to="/">Domů</Link>
            </li>
            <li className="nav--link">
              <Link to="/events">Události</Link>
            </li>
            <li className="nav--link">
              <Link to="/about">O projektu</Link>
            </li>
            <li className="nav--link">
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="nav__right">
        <DropdownMenu
          options={[{ label: "cz" }, { label: "en" }, { label: "de" }]}
        >
          <IconButton variant="secondary" style={{fontSize: '1.2rem', fontWeight: '500'}}>
            cz
          </IconButton>
        </DropdownMenu>
        
        <DropdownMenu
          options={
            token
              ? role === 2
                ? [
                    { label: "Profil", link: `/app/profil/${id}`, optionIcon: <IoPersonOutline /> },
                    { label: "Upozornění", link: `/app/mail`, optionIcon: <IoMailOutline /> },
                    { label: "Můj kalendář", link: `/app/calendar`, optionIcon: <IoCalendarOutline /> },
                    { label: "Odhlásit se", onClick: handleLogout, optionIcon: <IoLogOutOutline /> },
                  ]
                : [{ label: "Odhlásit se", onClick: handleLogout }]
              : [
                  { label: "Přihlásit se", link: "/app/login" },
                  { label: "Registrace", link: "/app/register" },
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
                Najít událost
              </Button>
            </Link>
          ) : (
            <Link to="/app/adminPage/events">
              <Button>
                <IoCalendarOutline />
                Správa
              </Button>
            </Link>
          )
        ) : (
          <Link to="/app/register" className="xbold">
            <Button>
              <LuPlus />
              Přidat se
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
