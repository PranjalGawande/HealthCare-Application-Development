import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import DoctorDashboard from "./Components/Doctor/DoctorDashboard";
import ReceptionistNewPatientDashboard from "./Components/Receptionist/ReceptionistNewPatientDashboard";
import AddDoctorForm from "./Components/Admin/AddDoctorForm";
import AddStaffForm from "./Components/Admin/AddReceptionistForm";
import ViewDoctors from "./Components/Admin/ViewDoctors";
// import HospitalFormLayout from "./Components/HospitalFormLayout";
// import VerificationForm from "./Components/VerificationForm";
// import DoctorAppointment from "./Components/DoctorAppointment";
import CNForm from "./Components/Doctor/CNForm";
// import { PatientHistory } from "./Components/Doctor/PatientHistory";
import ViewStaff from "./Components/Admin/ViewReceptionist";
import AddAdminForm from "./Components/Admin/AddAdminForm";
import ViewAdmin from "./Components/Admin/ViewAdmin";
import { ViewAdminDetails } from "./Components/Admin/ViewAdminDetails";
import { AdminPasswordChange } from "./Components/Admin/AdminPasswordChange";
import { ViewDoctorDetails } from "./Components/Doctor/ViewDoctorDetails";
import { AdminChangeDoctorPassword } from "./Components/Admin/AdminChangeDoctorPassword";
import { AdminUpdateDoctorDetails } from "./Components/Admin/AdminUpdateDoctorDetails";
import { AdminChangeReceptionistPassword } from "./Components/Admin/AdminChangeReceptionistPassword";
import { AdminUpdateReceptionistDetails } from "./Components/Admin/AdminUpdateReceptionistDetails";
// import AdminUpdateReceptionistDetails
import { ViewReceptionistDetails } from "./Components/Receptionist/ViewReceptionistDetails";
import { ViewAppointments } from "./Components/Doctor/ViewAppointments";
import { AdhaarAbhaIdCreation } from "./Components/Receptionist/AdhaarAbhaIdCreation";
import { AbhaIdVerification } from "./Components/Receptionist/AbhaIdVerification";
import { AbhaIdDisplay, AbhaIdDisplayAndAdd } from "./Components/Receptionist/AddPatient";
import { AbhaIdOtpVerification } from "./Components/Receptionist/AbhaIdOtpVerification";
import { AdhaarOtpVerification } from "./Components/Receptionist/AdhaarOtpVerification";
import { AbhaMobileNo } from "./Components/Receptionist/AbhaMobileNo";
import { NewAbhaNoOtpVerification } from "./Components/Receptionist/NewAbhaNoOtpVerification";
import { AddAppointment } from "./Components/Receptionist/AddAppointment";
import { HealthIdByAdhaar } from "./Components/Receptionist/HealthIdByAdhaar";
import { toast, Toaster } from "react-hot-toast";
// import { AddPatientDetails } from "./Components/AddPatientDetails";
import { Analytics } from "./Components/Admin/Analytics";
import ReceptionistDashboard from "./Components/Receptionist/ReceptionistDashboard";
import { ExistingPatientAbhaSearch } from "./Components/Receptionist/ExistingPatientAbhaSearch";
import { ExistingPatientDetails } from "./Components/Receptionist/ExistingPatientDetails";


function App() {

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          className: '',
          style: {
            width: 'auto',
            padding: '16px',
            fontSize: '1.5rem',
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
          <Route path="/admin/analytics" element= {<Analytics/>} />
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
          <Route path="/receptionist/new-patient" element={<ReceptionistNewPatientDashboard />} />
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/admin/view-doctor-info" element={<ViewDoctors />} />
          <Route path="/admin/view-receptionist-info" element={<ViewStaff />} />
          <Route path="/admin/view-admin-info" element={<ViewAdmin />} />
          <Route path="/doctor/consultation-form" element={<CNForm />} />
          {/* <Route path="/patientHistory" element={<PatientHistory />} /> */}
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
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/receptionist/existing-patient-abha-search" element={<ExistingPatientAbhaSearch />} />
          <Route path="/receptionist/existing-patient-details" element={<ExistingPatientDetails />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
