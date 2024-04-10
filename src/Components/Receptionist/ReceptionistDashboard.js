import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import receptionistImage from '../../assets/ReceptionistPage.png';
import toast from "react-hot-toast";
import { NavLink } from 'react-router-dom';

export default function ReceptionistDashboard() {
  const navigate = useNavigate();
  const recpName = localStorage.getItem('Name');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const recpName = localStorage.getItem("Name");
    if (!token) {
      navigate("/");
    }
    if (role === "DOCTOR" || role === "ADMIN") {
      navigate("/");
      localStorage.clear();
    }

    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      toast.success(`Welcome, ${recpName}`);
      localStorage.removeItem("loggedIn");
    }
  });

  const determineFontSize = () => {
    if (recpName && recpName.length > 14) {
      return '2rem';
    }
    return '3rem';
  };

  return (
    <div className='main-background-doctor'>
      <div className=" background h-full flex justify-center items-center ">
        <div className="flex admin-dashboard justify-evenly items-center gap-40 border-amber-300 border-solid ">
          <div className="image-container" >
            <img src={receptionistImage} className="admin-image" alt='receptionistImage' />
            <div className="dashboard-name-receptionist" style={{ fontSize: determineFontSize() }}>{recpName}</div>
          </div>
          <div className='flex flex-col gap-5 '>
            <NavLink
              to="/receptionist/new-patient"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}
            >
              NEW PATIENT
            </NavLink>
            <NavLink
              to="/receptionist/existing-patient-abha-search"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}
            >
              EXISTING PATIENT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
