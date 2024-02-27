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
import ViewDoctors from './Components/ViewDoctors';
import HospitalFormLayout from './Components/HospitalFormLayout';
import VerificationForm from './Components/VerificationForm';
import DoctorAppointment from './Components/DoctorAppointment';
import ConsultationForm from './Components/ConsultationForm';
import { PatientHistory } from './Components/PatientHistory';

function App() {

  return (
    <div className="App">
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-doctor" element={<AddDoctorForm />} />
            <Route path="/admin/add-staff" element={<AddStaffForm />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/receptionist" element={<ReceptionistDashboard />} />
            <Route path="/admin/view-doctor-info" element={<ViewDoctors />} />
            <Route path="/abhaCreation" element={<HospitalFormLayout />} />
            <Route path="/abhaVerification" element={<VerificationForm />} />
            <Route path="/doctorAppointment" element={<DoctorAppointment />} />
            <Route path="/consultationForm" element={<ConsultationForm />} />

            <Route path="/patientHistory" element={<PatientHistory />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
