import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login'
import AdminDashboard from './Components/AdminDashboard';
import DoctorDashboard from './Components/DoctorDashboard';
import ReceptionistDashboard from './Components/ReceptionistDashboard';
import AddDoctorForm from './Components/AddDoctorForm';
import AddStaffForm from './Components/AddStaffForm';

function App() {

  return (
    <div className="App">
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-doctor" element={<AddDoctorForm />} />
            <Route path="/admin/add-receptionist" element={<AddStaffForm />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/receptionist" element={<ReceptionistDashboard />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
