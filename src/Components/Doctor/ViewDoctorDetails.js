import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import doctorImage from "../../assets/DoctorPage.png";
import toast from "react-hot-toast";

export const ViewDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState('');
  const [role, setRole] = useState('');

  const handleUpdateDetails = () => {
    navigate('/admin/admin-doctor-details-update', { state: { doctor: doctorDetails } });
  };

  const handleChangePassword = () => {
    navigate('/password-change', { state: { doctor: doctorDetails } });
  };

  const handleActivateDoctor = async (email) => {
    try {
      if (!doctorDetails || !doctorDetails.email) {
        console.error("Doctor details or email not available.");
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

      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        status: true
      }));
      toast.success("Doctor activated successfully");
    } catch (error) {
      console.error("Error activating doctor:", error);
    }
  };


  const handleDeactivateDoctor = async (email) => {
    try {
      if (!doctorDetails || !doctorDetails.email) {
        console.error("Doctor details or email not available.");
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

      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        status: false
      }));
      toast.success("Doctor deactivated successfully");
    }
    catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setRole(localStorage.getItem("role"));
    if (!token) {
      navigate("/");
    }
    if (role === "Receptionist") {
      navigate("/");
      localStorage.clear();
    }

    if (location.state && location.state.doctor) {
      setDoctorDetails(location.state.doctor);
    } else {
      navigate('/error');
    }
    // console.log("doctorDetails",doctorDetails);
  }, [location.state, navigate]);
  console.log("doctorDetails", doctorDetails);

  const determineFontSize = () => {
    if (doctorDetails.name && doctorDetails.name.length > 14) {
      return '2.2rem';
    }
    return '3rem';
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex flex-col md:flex-row admin-dashboard justify-evenly items-center border-amber-300 border-solid ">
        <div className="image-container md:block hidden">
          <img src={doctorImage} className="admin-image" alt="doctorImage"/>
          <div className="dashboard-name-doctor" style={{ fontSize: determineFontSize() }}>{doctorDetails.name}</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login profile-details fw-bold text-center mt-5 mb-1">
            Profile Details
          </label>
          {doctorDetails && (
            <div className="flex flex-col text-2xl">
             

              <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    Name:
                  </span>
                  <span className="flex justify-start">
                    {doctorDetails.name}
                  </span>
                </div>
                <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    DOB:
                  </span>
                  <span className="flex justify-start">
                    {doctorDetails.dob}
                  </span>
                </div>
                <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    Mobile:
                  </span>
                  <span className="flex justify-start">
                    {doctorDetails.mobileNo}
                  </span>
                </div>
                <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    Gender:
                  </span>
                  <span className="flex justify-start">
                    {doctorDetails.gender}
                  </span>
                </div>
                <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    Speciality:
                  </span>
                  <span className="flex justify-start">
                    {doctorDetails.speciality}
                  </span>
                </div>
                <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    Experience:
                  </span>
                  <span className="flex justify-start">
                    {doctorDetails.experience}
                  </span>
                </div>
                <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    Email:
                  </span>
                  <span className="flex justify-start">
                    {doctorDetails.email}
                  </span>
                </div>
                <div className="flex mb-2 justify-start">
                  <span className="w-32 font-semibold flex justify-start">
                    Status:
                  </span>
                  <span
                    className={`flex justify-start ${
                      doctorDetails.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {doctorDetails.status ? "Active" : "Inactive"}
                  </span>
                </div>
              <br />
              <div className="mt-n1 mb-n5">
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{ width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={handleUpdateDetails}>Update DetailS</button>
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={handleChangePassword}>Change Password</button>
                {role !== 'DOCTOR' && (
                  <>
                    {doctorDetails.status === true ? (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{marginBottom: '2rem',  marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                        onClick={() => handleDeactivateDoctor(doctorDetails.email)}>Deactivate</button>
                    ) : (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{marginBottom: '2rem', marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onClick={() => handleActivateDoctor(doctorDetails.email)}>Activate</button>
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
