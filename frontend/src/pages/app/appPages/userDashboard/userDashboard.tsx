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
import { IoAdd, IoAddOutline, IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/userStore";
import { PiMapPin } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";

type UserDashBoardProps = {
  children: ReactNode;
};

export function UserDashboard({ children }: UserDashBoardProps) {
  const {id} = useSelector((root:RootState)=>root.auth); 

  return (
    <Dashboard id="user-dash">
      <DashboardLeft>
        <img src="/images/logo.png" className="logo" />
        <DashboardMenu>
          <Link to={'/app/findSpot'} id="find-spot-btn"><Button style={{fontWeight:'600'}}><IoMdAdd/><span>Najít spot</span></Button></Link>
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
          <DashboardMeuItem path="/">
          <IoHomeOutline />
            Domů
          </DashboardMeuItem>
        </DashboardMenu>
      </DashboardLeft>
      <DashboardRight>{children}</DashboardRight>
    </Dashboard>
  );
}
