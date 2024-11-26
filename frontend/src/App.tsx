import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { Profile } from "./pages/profile";
import { Domu } from "./pages/Domu";
import { UdalostiPage } from "./pages/Udalosti";
import { SpravaPage } from "./pages/Sprava";
import { LoginEvent } from "./pages/LoginEvent";
import { UserPage } from "./pages/User";
import { ProtectedRoute } from "./ui/components/protectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store/userStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeAuth } from "./api/authSlice";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(()=>{
    dispatch(initializeAuth());
  },[location]);

  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Routes>
      <Route path="/" element={<Domu />} />
      <Route path="/events" element={<UdalostiPage/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/profil/:userId" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute isAuth={!!token} />}>
        <Route path="/adminPage" element={<SpravaPage />} />
      </Route>
      <Route path='/findSpot' element={<LoginEvent/>}/>
      <Route path="/user/:userId" element={<UserPage/>}/>
    </Routes>
  );
}

export default App;
