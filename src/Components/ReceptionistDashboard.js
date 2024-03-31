import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import receptionistImage from '../assets/ReceptionistPage.png';
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from 'react-router-dom';



export default function ReceptionistDashboard() {
  const navigate = useNavigate();
  const recpName = localStorage.getItem('Name');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const recpName = localStorage.getItem("Name");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
    if (role === "DOCTOR" || role === "ADMIN") {
      navigate("/");
      localStorage.clear();
    }

    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      toast.success(`Welcome, ${recpName}`);
      localStorage.removeItem("loggedIn"); // Clear the flag after displaying the toast
    }
  }, []);


  const handleAbhaIdCreation = () => {
    // Navigate to the Abha ID Creation page
    navigate('/abhaCreation');
  };

  const handleAbhaIdVerification = () => {
    // Navigate to the Abha ID Verification page
    navigate('/abhaVerification');
  };

  const handleDoctorsAppointment = () => {
    // Navigate to the Doctor's Appointment page
    navigate('/doctorAppointment');
  };

  const determineFontSize = () => {
    if (recpName && recpName.length > 14) {
      return '2rem'; // Decrease font size if more than 5 words
    }
    return '3rem'; // Default font size
  };

  return (
    <div className='main-background-doctor'>
      {/* <Toaster /> */}
      <div className=" background h-full flex justify-center items-center ">
        <div className="flex admin-dashboard justify-evenly items-center gap-40 border-amber-300 border-solid ">
          <div className="image-container" >
            <img src={receptionistImage} className="admin-image" />
            <div className="dashboard-name-receptionist" style={{ fontSize: determineFontSize() }}>{recpName}</div>
          </div>
          <div className='flex flex-col gap-5 '>
            <NavLink
              to="/receptionist/adhaar-abha-id-creation"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}
            >
              ADD PATIENT
            </NavLink>
            <NavLink
              to="/receptionist/abha-verification"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}
            >
              ADD APPOINTMENT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <Toaster />
    //   <div className="h-full flex justify-center items-center mt-20">
    //     <div className='flex justify-evenly items-center gap-40 mt-20 border-amber-300 border-solid '>
    //       <div className='border border-gray p-5 rounded-md bg-slate-200'>
    //         <img src={receptionist} className="w-64 h-64" alt="Receptionist"></img>
    //       </div>
    //       <div className='flex flex-col gap-5 '>
    //         <button type="button" onClick={handleAbhaIdCreation} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ABHA ID CREATION</button>
    //         <button type="button" onClick={handleAbhaIdVerification} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ABHA ID VERIFICATION</button>
    //         <button type="button" onClick={handleDoctorsAppointment} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">DOCTOR'S APPOINTMENT</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
