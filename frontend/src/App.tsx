import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { Profile } from "./pages/profile";
import { Domu } from "./pages/Domu";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./api/authSlice";
import { UdalostiPage } from "./pages/Udalosti";
import { SpravaPage } from "./pages/Sprava";
import { LoginEvent } from "./pages/LoginEvent";
import { UserPage } from "./pages/User";
import { ProtectedRoute } from "./ui/components/protectedRoute";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const tokenExpiry = sessionStorage.getItem("tokenExpiry");
  const token = sessionStorage.getItem("authToken");
  const userData = sessionStorage.getItem("userData");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && tokenExpiry && userData) {
      const isExpired = new Date().getTime() > parseInt(tokenExpiry);
      if (isExpired) {
        dispatch(logout());
        
        if (window.location.pathname !== '/') {
          navigate('/'); 
        }
      } else {
        const user = JSON.parse(userData);
        dispatch(loginSuccess({ ...user, token }));
      }
    }
  }, [dispatch, token, tokenExpiry, userData, navigate]);
  

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
