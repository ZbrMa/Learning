import React from 'react';
import { useLocation, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/home/page";
import EventsPage from "./pages/events/page";
import AboutApp from "./pages/app/page";
import AboutPage from "./pages/about/page";
import { UserPage } from './pages/user/page';

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/app" element={<AboutApp />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
    </Routes>
  );
};


export default App;
