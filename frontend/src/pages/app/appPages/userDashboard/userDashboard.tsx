import { ReactNode } from "react";
import {
  Dashboard,
  DashboardLeft,
  DashboardMenu,
  DashboardMeuItem,
  DashboardRight,
} from "../../layout/dashboard";
import { Link } from "react-router-dom";
import { Button } from "../../../../ui/components/button/button";
import { IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/userStore";
import { PiMapPin } from "react-icons/pi";

type UserDashBoardProps = {
  children: ReactNode;
};

export function UserDashboard({ children }: UserDashBoardProps) {
  const {id} = useSelector((root:RootState)=>root.auth);

  return (
    <Dashboard>
      <DashboardLeft>
        <img src="/images/logo.png" className="logo" />
        <DashboardMenu>
          <Link to={'/app/findSpot'}><Button style={{fontWeight:'600'}}>Najít spot</Button></Link>
          <DashboardMeuItem path={`/app/profile/${id}`}>
            <HiOutlineUser />
            Profil
          </DashboardMeuItem>
          <DashboardMeuItem path="/app/calendar">
            <IoCalendarOutline />
            Kalendář
          </DashboardMeuItem>
          <DashboardMeuItem path="/app/mail">
            <HiOutlineNewspaper />
            Zprávy
          </DashboardMeuItem>
        </DashboardMenu>

        <Link to="/"  style={{ marginTop: "auto" }}>
          <Button size="small" variant="ternary">
            <IoHomeOutline />
            Domů
          </Button>
        </Link>
      </DashboardLeft>
      <DashboardRight>{children}</DashboardRight>
    </Dashboard>
  );
}
