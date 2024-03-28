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
import ViewStaff from './Components/ViewStaff';
import AddAdminForm from './Components/AddAdminForm';
import ViewAdmin from './Components/ViewAdmin';
import { ViewAdminDetails } from './Components/ViewAdminDetails';
import { AdminPasswordChange } from './Components/AdminPasswordChange';
import { ViewDoctorDetails } from './Components/ViewDoctorDetails';
import { AdminChangeDoctorPassword } from './Components/AdminChangeDoctorPassword';
import { AdminUpdateDoctorDetails } from './Components/AdminUpdateDoctorDetails';
import { AdminChangeReceptionistPassword } from './Components/AdminChangeReceptionistPassword';
import { AdminUpdateReceptionistDetails } from './Components/AdminUpdateReceptionistDetails';
// import AdminUpdateReceptionistDetails
import { ViewReceptionistDetails } from './Components/ViewReceptionistDetails';
import { ViewAppointments } from './Components/ViewAppointments';

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
            <Route path="/admin/admin-details" element={<ViewAdminDetails/>}/>
            <Route path="/admin/add-admin" element={<AddAdminForm/>} />
            <Route path="/admin/view-doctor-details" element={<ViewDoctorDetails />} />
            <Route path="/admin/admin-password-change" element={<AdminPasswordChange/>} />
            <Route path="/admin/admin-doctor-password-change" element={<AdminChangeDoctorPassword/>} />
            <Route path="/admin/admin-doctor-details-update" element={<AdminUpdateDoctorDetails/>} />
            <Route path="/admin/admin-receptionist-details-update" element={<AdminUpdateReceptionistDetails/>} />
            <Route path="/admin/admin-receptionist-password-change" element={<AdminChangeReceptionistPassword/>} />
            <Route path="/admin/view-receptionist-details" element={<ViewReceptionistDetails/>} />
            <Route path='/doctor/view-appointments' element={<ViewAppointments />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/receptionist" element={<ReceptionistDashboard />} />
            <Route path="/admin/view-doctor-info" element={<ViewDoctors />} />
            <Route path="/admin/view-receptionist-info" element={<ViewStaff />} />
            <Route path="/admin/view-admin-info" element={<ViewAdmin />} />
            <Route path="/abhaCreation" element={<HospitalFormLayout />} />
            <Route path="/abhaVerification" element={<VerificationForm />} />
            {/* <Route path="/doctorAppointment" element={<DoctorAppointment />} /> */}
            <Route path="/consultationForm" element={<ConsultationForm />} />
            <Route path="/patientHistory" element={<PatientHistory />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;
