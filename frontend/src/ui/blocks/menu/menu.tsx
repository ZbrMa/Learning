import { IoPersonOutline } from "react-icons/io5";
import { Button, IconButton } from "../../components/button/button";
import { DropdownMenu } from "../../components/dropdownMenu/dropdownMenu";
import "./menu.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/userStore";
import { logout } from "../../../api/authSlice";
import { LuPlus } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

type MenuProps = {
  variant?: "def" | "sec";
};

export function Menu({ variant = "def" }: MenuProps) {
  const {token,role,id} = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(false);
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

  return (
    <header
      className={`${scroll ? "scrolled" : ""} ${variant}`}
      style={{ height: `${scroll ? "64px" : ""}` }}
    >
      <img src="/images/logo.png" className="logo" />
      <nav>
        <div className="nav__inner">
          <ul className="nav__items">
            <li className="nav--link">
              <Link to="/">Domů</Link>
            </li>
            <li className="nav--link">
              <Link to="/events">Události</Link>
            </li>
            <li className="nav--link">
              <Link to="/about">O nás</Link>
            </li>
            <li className="nav--link">
              <Link to="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="nav__right">
        <IconButton variant="secondary" style={{fontSize:'1.2rem', fontWeight:'500'}}>
          cz
        </IconButton>
        <DropdownMenu
          options={
            token
              ? role === 2
                ? [
                    { label: "Profil", link: `/profil/${id}` },
                    { label: "Odhlásit se", onClick: handleLogout },
                  ]
                : [{ label: "Odhlásit se", onClick: handleLogout }]
              : [
                  { label: "Přihlásit se", link: "/login" },
                  { label: "Registrace", link: "/register" },
                ]
          }
        >
          <IconButton variant="secondary">
            <IoPersonOutline />
          </IconButton>
        </DropdownMenu>
        {token ? (
          role === 2 ? (
            <Link to="/findSpot">
              <Button>
                <IoCalendarOutline />
                Najít událost
              </Button>
            </Link>
          ) : (
            <Link to="/adminPage">
              <Button>
                <IoCalendarOutline />
                Správa
              </Button>
            </Link>
          )
        ) : (
          <Link to="/register" className="xbold">
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
