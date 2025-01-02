import { ReactNode } from "react";
import {
  Dashboard,
  DashboardLeft,
  DashboardMenu,
  DashboardMeuItem,
  DashboardRight,
} from "../../layout/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../ui/components/button/button";
import {
  IoAdd,
  IoAddOutline,
  IoCalendarOutline,
  IoFlagOutline,
  IoHomeOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reduxStore";
import { PiMapPin } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { DropdownMenu } from "../../../../ui/components/dropdownMenu/dropdownMenu";
import { setLang } from "../../../../redux/languageSlice";
import { IconButton } from "../../../../ui/components/button/button";
import { useTranslation } from "react-i18next";
import { logout } from "../../../../api/authSlice";

type UserDashBoardProps = {
  children: ReactNode;
};

export function UserDashboard({ children }: UserDashBoardProps) {
  const { id } = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();
  const { lang } = useSelector((root: RootState) => root.lang);
  const navigate = useNavigate();

  const { t } = useTranslation("app");

  const handleLangChange = (e: string) => {
    dispatch(setLang(e));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Dashboard id="user-dash">
      <DashboardLeft>
        <img src="/images/logo.png" className="logo" />
        
        <DashboardMenu>
        
          <Link to={"/app/findSpot"} id="find-spot-btn">
            <Button style={{ fontWeight: "600" }}>
              <IoMdAdd />
              <span>{t("dashboard.findSpot")}</span>
            </Button>
          </Link>
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
          <DropdownMenu
            options={[
              { label: "cs", onClick: () => handleLangChange("cs") },
              { label: "en", onClick: () => handleLangChange("en") },
              { label: "de", onClick: () => handleLangChange("de") },
            ]}
          >
            <Button
              variant="ternary"
              size="small"
              style={{ fontSize: "1.2rem", fontWeight: "400",width:'100%'}}
            >
              <IoFlagOutline/>
              {lang}
            </Button>
          </DropdownMenu>
          <DashboardMeuItem path="/">
            <IoHomeOutline />
            {t("dashboard.home")}
          </DashboardMeuItem>
          <Button variant="ternary" size="small" onClick={handleLogout}><IoLogOutOutline/>Odhlásit se</Button>
        </DashboardMenu>
        
      </DashboardLeft>
      <DashboardRight>{children}</DashboardRight>
    </Dashboard>
  );
}
