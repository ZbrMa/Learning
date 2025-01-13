import { ReactNode } from "react";
import {
  Dashboard,
  DashboardLeft,
  DashboardMenu,
  DashboardMeuItem,
  DashboardRight,
} from "../../layout/dashboard";
import { Link } from "react-router-dom";
import { Button, IconButton } from "../../../../ui/components/button/button";
import { IoArrowBackOutline, IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbMapPin2 } from "react-icons/tb";
import { HiOutlineNewspaper } from "react-icons/hi2";

type AdminDashBoardProps = {
  children: ReactNode;
};

export function AdminDashboard({ children }: AdminDashBoardProps) {
  return (
    <Dashboard>
      <DashboardLeft>
        <img src="/images/logo.png" className="logo" />
        <DashboardMenu>
          <DashboardMeuItem path="/app/adminPage/events">
            <IoCalendarOutline />
            Termíny
          </DashboardMeuItem>
          <DashboardMeuItem path="/app/adminPage/users">
            <HiOutlineUserGroup />
            Uživatelé
          </DashboardMeuItem>
          <DashboardMeuItem path="/app/adminPage/places">
            <TbMapPin2 />
            Místa
          </DashboardMeuItem>
          <DashboardMeuItem path="/app/adminPage/notifications">
            <HiOutlineNewspaper />
            Zprávy
          </DashboardMeuItem>
        </DashboardMenu>

        <Link to="/"  style={{ marginTop: "auto" }}>
          <Button size="small" variant="ternary">
            <IoArrowBackOutline />
            Odejít
          </Button>
        </Link>
      </DashboardLeft>
      <DashboardRight>{children}</DashboardRight>
    </Dashboard>
  );
}
