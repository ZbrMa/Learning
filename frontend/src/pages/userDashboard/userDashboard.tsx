import { ReactNode, useEffect, useState } from "react";
import { Dashboard,DashboardLeft,DashboardMenu,DashboardMeuItem,DashboardRight } from "../app/layout/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/components/button/button";
import {
  IoArrowBackOutline,
  IoCalendarOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reduxStore";
import { DropdownMenu } from "../../ui/components/dropdownMenu/dropdownMenu";
import { setLang } from "../../redux/languageSlice";
import { useTranslation } from "react-i18next";
import { logout } from "../../api/authSlice";
import { ILang } from "../../types/filtersTypes";
import { HiOutlineMicrophone } from "react-icons/hi2";

type UserDashBoardProps = {
  children: ReactNode;
};

export function UserDashboard({ children }: UserDashBoardProps) {
  const { id } = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();
  const { lang } = useSelector((root: RootState) => root.lang);
  const navigate = useNavigate();
  const { t } = useTranslation("app");
  const { t:tCom } = useTranslation("common");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLangChange = (e: ILang) => {
    dispatch(setLang(e.lang));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const checkMobile = () => {
    window.innerWidth <= 992 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Dashboard id="user-dash">
      {/* Horní lišta s hamburger menu */}
      {isMobile && (
        <div className="top-bar">
          <Link to={"/app/home"} className="top-bar__logo">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
          <Button variant="link" style={{ padding: "0" }} onClick={toggleMenu} id="dash-menu-open-btn">
            <IoMenuOutline />
          </Button>
          
        </div>
      )}

      {/* Postranní menu (skryté na mobilu) */}

      <div
        className={`side-menu ${isMobile ? "mobile" : ""} ${
          menuOpen ? "opened" : ""
        }`}
      >
        <DashboardLeft>
          {isMobile && (
            <Button
              variant="link"
              style={{ padding: "0", color: "var(--white)" }}
              id="dash-menu-close-btn"
              onClick={toggleMenu}
            >
              <IoCloseOutline />
            </Button>
          )}
          <Link to={"/app/home"}>
            <img src="/images/logo.png" className="logo" alt="app-logo"/>
          </Link>
          <DashboardMenu>
            <DropdownMenu
              options={[
                {
                  label: "cs",
                  onClick: () => handleLangChange({ lang: "cs" }),
                },
                {
                  label: "en",
                  onClick: () => handleLangChange({ lang: "en" }),
                },
                {
                  label: "de",
                  onClick: () => handleLangChange({ lang: "de" }),
                },
              ]}
              style={{ marginInline: "auto", width: "fit-content" }}
            >
              <Button
                variant="ternary"
                size="small"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "400",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                {lang}
              </Button>
            </DropdownMenu>
            <DashboardMeuItem
              path={"/app/findSpot"}
              id="find-spot-btn"
              color="red"
            >
              <HiOutlineMicrophone />
              <span>{t("dashboard.findSpot")}</span>
            </DashboardMeuItem>
            <DashboardMeuItem path={"/app/home"}>
              <IoHomeOutline />
              {t("dashboard.home")}
            </DashboardMeuItem>
            <DashboardMeuItem path={`/app/profile/${id}`}>
              <HiOutlineUser />
              {t("dashboard.profile")}
            </DashboardMeuItem>
            <DashboardMeuItem path="/app/calendar">
              <IoCalendarOutline />
              {t("dashboard.calendar")}
            </DashboardMeuItem>
            <DashboardMeuItem path="/app/mail">
              <HiOutlineNewspaper />
              {t("dashboard.messages")}
            </DashboardMeuItem>
            <div
              style={{
                marginTop: "auto",
                paddingTop: "16px",
                borderTop: "1px solid var(--darkGray)",
              }}
            >
              <DashboardMeuItem path="/">
                <IoArrowBackOutline />
                {t("dashboard.back")}
              </DashboardMeuItem>
              <Button variant="ternary" size="small" onClick={handleLogout}>
                <IoLogOutOutline style={{WebkitTransform: 'scaleX(-1)',transform: 'scaleX(-1)'}}/>
                {tCom("button.logout")}
              </Button>
            </div>
          </DashboardMenu>
        </DashboardLeft>
      </div>

      {/* Spodní navigační lišta */}
      {isMobile && (
        <div className="bottom-bar">
          <div className="flex-col items-center" id="find-spot-btn">
            <DashboardMeuItem path={"/app/findSpot"} color="red">
              <HiOutlineMicrophone />
            </DashboardMeuItem>
            <span>{t("dashboard.findSpot")}</span>
          </div>

          <DashboardMeuItem path={"/app/home"}>
            <IoHomeOutline />
            {t("dashboard.home")}
          </DashboardMeuItem>
          <DashboardMeuItem path={`/app/profile/${id}`}>
            <HiOutlineUser />
            {t("dashboard.profile")}
          </DashboardMeuItem>
          <DashboardMeuItem path="/app/calendar">
            <IoCalendarOutline />
            {t("dashboard.calendar")}
          </DashboardMeuItem>
          <DashboardMeuItem path="/app/mail">
            <HiOutlineNewspaper />
            {t("dashboard.messages")}
          </DashboardMeuItem>
        </div>
      )}

      {/* Obsah */}
      <DashboardRight>{children}</DashboardRight>
    </Dashboard>
  );
}
