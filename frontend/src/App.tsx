import React from 'react';
import { NavBar } from './components/common/navBar';
import { Footer } from './components/common/footer';
import {Domu} from './pages/Domu';
import {Registrace} from './pages/Registrace';
import {Galerie} from './pages/Galerie';
import { Profile } from './pages/Profile';
import { AdminPage } from './pages/AdminPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from './context/authContext';
import { ModalProvider } from './context/modalContext';
import { EventPage } from './pages/EventPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ModalProvider>
          <NavBar />
          <div className='main'>
          <Routes>
            <Route path="/" element={<Domu/>} />
            <Route path="/registrace" element={<Registrace />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/event/:eventId" element={<EventPage />} />
          </Routes>
          </div>
          <Footer />
        </ModalProvider>
      </AuthProvider>
      </Router>
  );
};

export default App;
