import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import recepImage from '../../assets/ReceptionistPage.png';

export const ViewReceptionistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffDetails, setStaffDetails] = useState('');
  const role = localStorage.getItem("role");

  const handleUpdateDetails = () => {
    navigate('/admin/admin-receptionist-details-update', { state: { staff: staffDetails } });
  };

  const handleChangePassword = () => {
    navigate('/admin/admin-receptionist-password-change', { state: { staff: staffDetails } });
  };

  const handleActivateDoctor = async (email) => {
    try {
      if (!staffDetails || !staffDetails.email) {
        console.error("Receptionist details or email not available.");
        return;
      }
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formData = { email: email };
      const response = await axios.post(
        `http://localhost:9191/admin/activateStaff`,
        formData,
        { headers: headers }
      );
      setStaffDetails(prevStaffDetails => ({
        ...prevStaffDetails,
        status: true // Assuming response.data.status contains the updated status
      }));
    } catch (error) {
      console.error("Error activating doctor:", error);
    }
  };

  const handleDeactivateDoctor = async (email) => {
    try {
      if (!staffDetails || !staffDetails.email) {
        console.error("Receptionist details or email not available.");
        return;
      }

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formData = { email: email };
      const response = await axios.post(
        `http://localhost:9191/admin/deActivateStaff`,
        formData,
        { headers: headers }
      );
      setStaffDetails(prevStaffDetails => ({
        ...prevStaffDetails,
        status: false
      }));
    }
    catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate('/');
    }
    if (role === "DOCTOR") {
      navigate('/');
      localStorage.clear();
    }
    console.log(location.state.staff);
    if (location.state && location.state.staff) {
      setStaffDetails(location.state.staff);
    } else {
      navigate('/error');
    }
  }, [location.state, navigate]);


  const determineFontSize = () => {
    if (staffDetails.name && staffDetails.name.length > 14) {
      return '2rem';
    }
    return '3rem';
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={recepImage} className="admin-image" />
          <div className="dashboard-name-receptionist" style={{ fontSize: determineFontSize() }}>{staffDetails.name}</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Profile Details
          </label>
          {staffDetails && (
            <div className="flex flex-col text-2xl">
              <p className="mb-2 font-bold">Name:<span className="font-normal"> {staffDetails.name}</span></p>
              <p className="mb-2 font-bold">Date of Birth: <span className="font-normal">{new Date(staffDetails.dob).toLocaleDateString()}</span></p>
              <p className="mb-2 font-bold">Mobile No: <span className="font-normal">{staffDetails.mobileNo}</span></p>
              <p className="mb-2 font-bold">Gender: <span className="font-normal">{staffDetails.gender}</span></p>
              <p className="mb-2 font-bold">Email: <span className="font-normal">{staffDetails.email}</span></p>
              <p className="mb-2 font-bold">Status: {staffDetails.status ? 'Active' : 'Inactive'}</p>
              <br />
              <div className="mt-3">
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                  onClick={handleUpdateDetails}>Update Details</button>
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                  onClick={handleChangePassword}>Change Password</button>
                {role !== 'Receptionist' && (
                  <>
                    {staffDetails.status === true ? (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                        onClick={() => handleDeactivateDoctor(staffDetails.email)}>Deactivate</button>
                    ) : (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                        onClick={() => handleActivateDoctor(staffDetails.email)}>Activate</button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};