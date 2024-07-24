import React, { useState, useEffect, useContext} from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { ProfileNav } from "./profileNav";
import './styles/navBar.css';
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu, IoLogInOutline, IoPersonOutline,IoEllipsisHorizontalSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { LoggedUser } from "./loggedUser";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const token = Cookies.get('token');

  const { user, loading} = useContext(AuthContext);

  const { pathname } = useLocation();

  const shouldBeWhite = (path:string) => {
    const pathsWithScrolledClass = ["/login","/profile"];

    return pathsWithScrolledClass.includes(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openProfileMenu = () => {
    if (profileMenuOpen) setProfileMenuOpen(false)
    else setProfileMenuOpen(true);
  }

  return (
    <header className={`navbar ${scrolled || shouldBeWhite(pathname) ? 'scrolled' : ''}`}>
      <div className="menu-container">
        <div className="menu-inner">
          <NavLink to="/" className="title" onClick={() => setMenuOpen(false)}>
            BUSKING
          </NavLink>
          <div className={`menu-flex ${menuOpen ? 'open' : ''}`}>
              <ul className="menu">
                  <li className="menu-item">
                      <NavLink to="/registrace" className="nav-link" onClick={() => setMenuOpen(false)}>
                      Registrace
                      </NavLink>
                  </li>
                  <li className="menu-item">
                      <NavLink to="/galerie" className="nav-link" onClick={() => setMenuOpen(false)}>
                      Galerie
                      </NavLink>
                  </li>
                  <li className="menu-item">
                      <NavLink to="/kontakt" className="nav-link" onClick={() => setMenuOpen(false)}>
                      Kontakt
                      </NavLink>
                  </li>
                  {token && user.role === 1 &&( 
                    <li className="menu-item">
                      <NavLink to="/adminPage" className="nav-link" onClick={() => setMenuOpen(false)}>
                      Správa
                      </NavLink>
                    </li>
                  )}
                  
              </ul>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? <IoClose /> : <IoMenu />}
          </div>
          <div className="login-icon" onClick={openProfileMenu}>
          {loading ? (
            <IoEllipsisHorizontalSharp></IoEllipsisHorizontalSharp>
          ) : (
              <>
              <IoPersonOutline></IoPersonOutline>
              {user.authenticated &&<LoggedUser></LoggedUser>}
              </>
          )}
          </div>
          <ProfileNav isHidden={profileMenuOpen} openMenu={openProfileMenu}></ProfileNav>
        </div>
      </div>
    </header>
  );
}
