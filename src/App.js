import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Admin from './pages/Admin-Dashboard';
import Profile from './pages/Profile';
import Explorer from './pages/Explorer';
import OrderVaccine from './pages/OrderVaccine';
import HealthCAdmin from './pages/HealthCAdmin';
function App() {

  const [auth, setAuth] = useState(false);  
  return (
    <>
      <div className="App" style={{ margin: '5em 2em' }}>
        {/* <h2>Vaccine Tracking Dapp</h2> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contactus" element={<ContactUs />} />
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          {/* Manufacturer Admin */}
          <Route path="/admin/:username" element={<Admin />} />
          <Route path="/admin/:username/profile" element={<Profile />} />
          <Route path="/admin/:username/explorer" element={<Explorer />} />
          {/* HealthCare Admin */}
          {/* <Route path="/healthcadmin/:username" element={<HealthCAdmin />} />
          <Route path="/healthcadmin/:username/profile" element={<Profile />} /> */}
          <Route path="/healthcadmin/:username/neworder" element={<OrderVaccine/>} />
          {/* <Route path="/healthcadmin/:username/explorer" element={<Explorer />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

// Manuf id = 0xd0a4b400be36d6659138e3f30e547c7f56c77a95815f2613c74058c4e8623168
// Dist id = 0xdb5ec683ba2b7c85636003961c38cc98a1974c678bc41adee4b99e1619850ccf
// Health id =  0x5c44f32bf683e06b41e3879fe4a95055d303045b4a3e9ecfdc820b5eb9d854cd
// superadmin id = 0xe4041c13a985afece8aab653f7b77a1e7f312381bd7738ead7806eee6c03bb1a
