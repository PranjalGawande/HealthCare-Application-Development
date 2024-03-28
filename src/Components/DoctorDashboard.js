// import React from 'react'

// const DoctorDashboard = () => {
//   return (
//     <div>DoctorDashboard</div>
//   )
// }

// export default DoctorDashboard;



import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorImage from '../assets/DoctorPage.png'; 
import { NavLink } from 'react-router-dom';

export default function DoctorDashboard() {
  const doctorName = localStorage.getItem('Name');
  const navigate = useNavigate();

  const determineFontSize = () => {
    if (doctorName.length > 14) {
      return '2rem'; // Decrease font size if more than 5 words
    }
    return '3rem'; // Default font size
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
  }, []);
 


  const handleConsultationForm = () => {
    // Navigate to the Abha ID Creation page
    navigate('/consultationForm');
  };

  const handlePatientHistory = () => {
    // Navigate to the Abha ID Verification page
    navigate('/patientHistory');
  };

  // const handleDoctorsAppointment = () => {
  //   // Navigate to the Doctor's Appointment page
  //   navigate('/FormV');
  // };

  return (
    <div className='main-background-doctor'>
      <div className=" background h-full flex justify-center items-center ">
        <div className="flex admin-dashboard justify-evenly items-center gap-40 border-amber-300 border-solid ">
        <div className="image-container" >
            <img src={doctorImage} className="admin-image"/>
            <div className="dashboard-name-doctor" style={{ fontSize: determineFontSize() }}>{doctorName}</div>
          </div>
          <div className='flex flex-col gap-5 '>
          <NavLink
              to="/doctor/view-appointments"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{textAlign: 'center', fontSize: '30px', fontWeight: 'bold'}}
            >
              VIEW APPOINTMENTS
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
