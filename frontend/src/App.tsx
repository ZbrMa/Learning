import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/app/appPages/login/login";
import { Register } from "./pages/app/appPages/register/register";
import { Profile } from "./pages/app/appPages/profile";
import { Domu } from "./pages/visitor/visitorPages/Domu";
import { UdalostiPage } from "./pages/visitor/visitorPages/Udalosti";
import { LoginEvent } from "./pages/app/appPages/LoginEvent";
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
import { UserCalendar } from "./pages/app/appPages/userCalendar";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(()=>{
    dispatch(initializeAuth());
  },[location]);

  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Routes>
      {/*návštěvnické části */}
      <Route path="/" element={<Domu />} />
      <Route path="/events" element={<UdalostiPage/>}/>
      <Route path="/user/:userId" element={<UserPage/>}/>

      {/* části aplikace*/}
      <Route path="/app/calendar" element={<UserCalendar />} />
      <Route path="/app/register" element={<Register />} />
      <Route path="/app/profil/:userId" element={<Profile />} />
      <Route path="/app/login" element={<Login />} />
      <Route element={<ProtectedRoute isAuth={!!token} />}>
        <Route path="/app/adminPage/events" element={<AdminEvents />} />
        <Route path="/app/adminPage/places" element={<AdminPlaces />} />
        <Route path="/app/adminPage/users" element={<AdminUsers />} />
        <Route path="/app/adminPage/notifications" element={<AdminNotifications />} />
      </Route>
      <Route path='/app/findSpot' element={<LoginEvent/>}/>
      
    </Routes>
  );
}

export default App;
