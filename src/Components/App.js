import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import DoctorDashboard from "./DoctorDashboard";
import ReceptionistDashboard from "./ReceptionistDashboard";
import AddDoctorForm from "./AddDoctorForm";
import AddStaffForm from "./AddStaffForm";
import ViewDoctors from "./ViewDoctors";
import HospitalFormLayout from "./HospitalFormLayout";
import VerificationForm from "./VerificationForm";
import DoctorAppointment from "./DoctorAppointment";
// import ConsultationForm from './Components/ConsultationForm';
import CNForm from "./Doctor/CNForm";
import { PatientHistory } from "./Doctor/PatientHistory";
import ViewStaff from "./ViewStaff";
import AddAdminForm from "./AddAdminForm";
import ViewAdmin from "./ViewAdmin";
import { ViewAdminDetails } from "./ViewAdminDetails";
import { AdminPasswordChange } from "./AdminPasswordChange";
import { ViewDoctorDetails } from "./Doctor/ViewDoctorDetails";
import { AdminChangeDoctorPassword } from "./AdminChangeDoctorPassword";
import { AdminUpdateDoctorDetails } from "./AdminUpdateDoctorDetails";
import { AdminChangeReceptionistPassword } from "./AdminChangeReceptionistPassword";
import { AdminUpdateReceptionistDetails } from "./AdminUpdateReceptionistDetails";
// import AdminUpdateReceptionistDetails
import { ViewReceptionistDetails } from "./Receptionist/ViewReceptionistDetails";
import { ViewAppointments } from "./Doctor/ViewAppointments";
import { AdhaarAbhaIdCreation } from "./Receptionist/AdhaarAbhaIdCreation";
import { AbhaIdVerification } from "./Receptionist/AbhaIdVerification";
import { AbhaIdDisplay, AbhaIdDisplayAndAdd } from "./Receptionist/AddPatient";
import { AbhaIdOtpVerification } from "./Receptionist/AbhaIdOtpVerification";
import { AdhaarOtpVerification } from "./Receptionist/AdhaarOtpVerification";
import { AbhaMobileNo } from "./Receptionist/AbhaMobileNo";
import { NewAbhaNoOtpVerification } from "./Components/NewAbhaNoOtpVerification";
import { AddAppointment } from "./Receptionist/AddAppointment";
import { HealthIdByAdhaar } from "./Receptionist/HealthIdByAdhaar";
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
