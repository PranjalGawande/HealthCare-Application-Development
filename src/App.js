import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import DoctorDashboard from "./Components/DoctorDashboard";
import ReceptionistDashboard from "./Components/ReceptionistDashboard";
import AddDoctorForm from "./Components/AddDoctorForm";
import AddStaffForm from "./Components/AddStaffForm";
import ViewDoctors from "./Components/ViewDoctors";
import HospitalFormLayout from "./Components/HospitalFormLayout";
import VerificationForm from "./Components/VerificationForm";
import DoctorAppointment from "./Components/DoctorAppointment";
// import ConsultationForm from './Components/ConsultationForm';
import CNForm from "./Components/CNForm";
import { PatientHistory } from "./Components/PatientHistory";
import ViewStaff from "./Components/ViewStaff";
import AddAdminForm from "./Components/AddAdminForm";
import ViewAdmin from "./Components/ViewAdmin";
import { ViewAdminDetails } from "./Components/ViewAdminDetails";
import { AdminPasswordChange } from "./Components/AdminPasswordChange";
import { ViewDoctorDetails } from "./Components/ViewDoctorDetails";
import { AdminChangeDoctorPassword } from "./Components/AdminChangeDoctorPassword";
import { AdminUpdateDoctorDetails } from "./Components/AdminUpdateDoctorDetails";
import { AdminChangeReceptionistPassword } from "./Components/AdminChangeReceptionistPassword";
import { AdminUpdateReceptionistDetails } from "./Components/AdminUpdateReceptionistDetails";
// import AdminUpdateReceptionistDetails
import { ViewReceptionistDetails } from "./Components/ViewReceptionistDetails";
import { ViewAppointments } from "./Components/ViewAppointments";
import { AdhaarAbhaIdCreation } from "./Components/AdhaarAbhaIdCreation";
import { AbhaIdVerification } from "./Components/AbhaIdVerification";
import { AbhaIdDisplay, AbhaIdDisplayAndAdd } from "./Components/AbhaIdDisplayAndAdd";
import { AbhaIdOtpVerification } from "./Components/AbhaIdOtpVerification";
import { AdhaarOtpVerification } from "./Components/AdhaarOtpVerification";
import { AbhaMobileNo } from "./Components/AbhaMobileNo";
import { NewAbhaNoOtpVerification } from "./Components/NewAbhaNoOtpVerification";
import { AddAppointment } from "./Components/AddAppointment";
import { HealthIdByAdhaar } from "./Components/HealthIdByAdhaar";
import { Toaster } from "react-hot-toast";
// import { AddPatientDetails } from "./Components/AddPatientDetails";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '5px solid #0f3c53',
            padding: '16px',
            color: '#713200',
          },
        }}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-doctor" element={<AddDoctorForm />} />
          <Route path="/admin/add-staff" element={<AddStaffForm />} />
          <Route path="/admin/admin-details" element={<ViewAdminDetails />} />
          <Route path="/admin/add-admin" element={<AddAdminForm />} />
          <Route
            path="/admin/view-doctor-details"
            element={<ViewDoctorDetails />}
          />
          <Route
            path="/admin/admin-password-change"
            element={<AdminPasswordChange />}
          />
          <Route
            path="/admin/admin-doctor-password-change"
            element={<AdminChangeDoctorPassword />}
          />
          <Route
            path="/admin/admin-doctor-details-update"
            element={<AdminUpdateDoctorDetails />}
          />
          <Route
            path="/admin/admin-receptionist-details-update"
            element={<AdminUpdateReceptionistDetails />}
          />
          <Route
            path="/admin/admin-receptionist-password-change"
            element={<AdminChangeReceptionistPassword />}
          />
          <Route
            path="/admin/view-receptionist-details"
            element={<ViewReceptionistDetails />}
          />
          <Route
            path="/doctor/view-appointments"
            element={<ViewAppointments />}
          />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/admin/view-doctor-info" element={<ViewDoctors />} />
          <Route path="/admin/view-receptionist-info" element={<ViewStaff />} />
          <Route path="/admin/view-admin-info" element={<ViewAdmin />} />
          <Route path="/doctor/consultation-form" element={<CNForm />} />
          <Route path="/patientHistory" element={<PatientHistory />} />
          {/* <Route path="/abhaCreation" element={<HospitalFormLayout />} /> */}
          {/* <Route path="/abhaVerification" element={<VerificationForm />} /> */}
          {/* <Route path="/doctorAppointment" element={<DoctorAppointment />} /> */}
          <Route path="/receptionist/adhaar-abha-id-creation" element={<AdhaarAbhaIdCreation />} />
          <Route path="/receptionist/adhaar-otp-verification" element={<AdhaarOtpVerification />} />
          <Route path="/receptionist/abha-mobile-no" element={<AbhaMobileNo />} />
          <Route path="/receptionist/abha-new-mobile-no-verification" element={<NewAbhaNoOtpVerification />} />
          <Route path="/receptionist/health-id-adhaar" element={<HealthIdByAdhaar />} />
          <Route path="/receptionist/abha-id-display-and-add" element={<AbhaIdDisplayAndAdd />} />
          {/* <Route path="/receptionist/add-patient-details" element={<AddPatientDetails />} /> */}
          <Route path="/receptionist/abha-verification" element={<AbhaIdVerification />} />
          <Route path="/receptionist/abha-otp-verification" element={<AbhaIdOtpVerification />} />
          <Route path="/receptionist/add-appointment" element={<AddAppointment />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
