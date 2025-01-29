import { UserDashboard } from "./userDashboard";
import { UserHomeHeader } from "./userHome/header";
import { UserHomeCalendar } from "./userHome/calendar";
import { UserNewNotifications } from "./userHome/newMessages";
import './userHome/userHome.css';
import { UserContact } from "./userHome/contact";

export function UserHome() {
  return (
    <UserDashboard>
      <div className="app__home">
        <UserHomeHeader />
        <UserNewNotifications />
        <UserHomeCalendar />
        <UserContact/>
      </div>
    </UserDashboard>
  );
}

