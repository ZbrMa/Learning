import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/app/appPages/login/login";
import { Register } from "./pages/app/appPages/register/register";
import { Domu } from "./pages/visitor/visitorPages/Domu";
import { UdalostiPage } from "./pages/visitor/visitorPages/Udalosti";
import { UserPage } from "./pages/visitor/visitorPages/User";
import { ProtectedRoute } from "./ui/components/protectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store/userStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeAuth } from "./api/authSlice";
import { useLocation } from "react-router-dom";
import { AdminEvents } from "./pages/app/appPages/adminDashboard/adminEvents";
import { AdminUsers } from "./pages/app/appPages/adminDashboard/adminUsers";
import { AdminPlaces } from "./pages/app/appPages/adminDashboard/adminPlaces";
import { AdminNotifications } from "./pages/app/appPages/adminDashboard/adminNotifications";
import { UserCalendar } from "./pages/app/appPages/userDashboard/userCalendar";
import { UserProfile } from "./pages/app/appPages/userDashboard/userProfile";
import { UserFindSpot } from "./pages/app/appPages/userDashboard/userFindSpot";
import { UserNotifications } from "./pages/app/appPages/userDashboard/userNotifications";
import { KontaktPage } from "./pages/visitor/visitorPages/Kontakt";

const events = [
  "mousedown",
  "mousemove",
  "wheel",
  "keydown",
  "touchstart",
  "scroll",
];

function updateExpiry() {
  const expiryTime = new Date().getTime() + 30 * 60 * 1000;
  localStorage.setItem("tokenExpiry", expiryTime.toString());
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token, authChecked } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    events.forEach((event) =>
      window.addEventListener(event, updateExpiry, { passive: true })
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateExpiry)
      );
    };
  }, []);

  useEffect(() => {
    const activityCheckInterval = setInterval(
      () => dispatch(initializeAuth()),
      600000
    );
    return () => clearInterval(activityCheckInterval);
  }, []);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [location]);

  return (
    <Routes>
      {/*návštěvnické části */}
      <Route path="/" element={<Domu />} />
      <Route path="/events" element={<UdalostiPage />} />
      <Route path="/contact" element={<KontaktPage />} />
      <Route path="/user/:userId" element={<UserPage />} />

      {/* části aplikace*/}
      <Route path="/app/login" element={<Login />} />
      <Route path="/app/register" element={<Register />} />

      <Route element={<ProtectedRoute isAuth={!!token} isChecked={authChecked} />}>
        <Route path="/app/calendar" element={<UserCalendar />} />
        <Route path="/app/profile/:userId" element={<UserProfile />} />
        <Route path="/app/findSpot" element={<UserFindSpot />} />
        <Route path="/app/mail" element={<UserNotifications />} />
        <Route path="/app/calendar" element={<UserProfile />} />
        <Route path="/app/adminPage/events" element={<AdminEvents />} />
        <Route path="/app/adminPage/places" element={<AdminPlaces />} />
        <Route path="/app/adminPage/users" element={<AdminUsers />} />
        <Route path="/app/adminPage/notifications" element={<AdminNotifications />}/>
      </Route>
    </Routes>
  );
};

export default App;
