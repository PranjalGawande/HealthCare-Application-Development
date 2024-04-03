import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import doctorImage from "../../assets/DoctorPage.png";



export const ViewDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState('');
  const [role, setRole] = useState('');
  // console.log("Location", location.state.doctor);

  const handleUpdateDetails = () => {
    // Navigate to the update details page
    navigate('/admin/admin-doctor-details-update', { state: { doctor: doctorDetails } });
  };

  const handleChangePassword = () => {
    // Navigate to the change password page
    navigate('/admin/admin-doctor-password-change', { state: { doctor: doctorDetails } });
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
        status: true // Assuming response.data.status contains the updated status
      }));
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
        status: false // Assuming response.data.status contains the updated status
      }));
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
      // Handle the case where doctor details are not available
      navigate('/error'); // Redirect to error page or handle accordingly
    }
    // console.log("doctorDetails",doctorDetails);
  }, [location.state, navigate]);
  console.log("doctorDetails", doctorDetails);
 
  const determineFontSize = () => {
    if (doctorDetails.name && doctorDetails.name.length > 14) {
      return '2rem'; // Decrease font size if more than 5 words
    }
    return '3rem'; // Default font size
  };

  return (
    // <div className="container glass-background mt-5">
    //   <label className="text-login fw-bold text-center">
    //     DOCTOR DETAILS
    //   </label>
    //   {doctorDetails && (
    //     <div>
    //       <p className="mb-2">Doctor Id: {doctorDetails.doctorId}</p>
    //       <p className="mb-2">Name: {doctorDetails.name}</p>
    //       <p className="mb-2">Date of Birth: {new Date(doctorDetails.dob).toLocaleDateString()}</p>
    //       <p className="mb-2">Mobile No: {doctorDetails.mobileNo}</p>
    //       <p className="mb-2">Gender: {doctorDetails.gender}</p>
    //       <p className="mb-2">Abha ID: {doctorDetails.abhaId}</p>
    //       <p className="mb-2">Speciality: {doctorDetails.speciality}</p>
    //       <p className="mb-2">Experience: {doctorDetails.experience} years</p>
    //       <p className="mb-2">Email: {doctorDetails.email}</p>
    //       <p className="mb-2">Status: {doctorDetails.status ? 'Active' : 'Inactive'}</p>
    //       <br />
    //       <div className="mt-3">
    //         {/* Add buttons with respective functionalities */}
    //         <button className="btn btn-primary me-2" onClick={handleUpdateDetails}>Update Details</button>
    //         <button className="btn btn-primary me-2" onClick={handleChangePassword}>Change Password</button>
            
    //         <div className="mt-3">
    //           {/* Add buttons with respective functionalities */}
    //           {console.log("Role:", role)}
    //           {console.log("Doctor Details:", doctorDetails)}
    //           {role === 'DOCTOR' ? null : (
    //             <>
    //               {doctorDetails.status === true ? (
    //                 <button className="btn btn-danger me-2" onClick={() => handleDeactivateDoctor(doctorDetails.email)}>Deactivate</button>
    //               ) : (
    //                 <button className="btn btn-success me-2" onClick={() => handleActivateDoctor(doctorDetails.email)}>Activate</button>
    //               )}
    //             </>
    //           )}
    //         </div>

    //       </div>
    //     </div>
    //   )}
    // </div>


    <div className="h-full flex justify-center items-center ">
    <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
      <div className="image-container">
        <img src={doctorImage} className="admin-image" />
        <div className="dashboard-name-doctor" style={{ fontSize: determineFontSize() }}>{doctorDetails.name}</div>
      </div>
      <div className="container glass-background mt-5">
        <label className="text-login fw-bold text-center">
          Profile Details
        </label>
        {doctorDetails && (
          <div className="flex flex-col text-2xl">
            <p className="mb-2 font-bold">Name:<span className="font-normal"> {doctorDetails.name}</span></p>
            <p className="mb-2 font-bold">Date of Birth: <span className="font-normal">{new Date(doctorDetails.dob).toLocaleDateString()}</span></p>
            <p className="mb-2 font-bold">Mobile No: <span className="font-normal">{doctorDetails.mobileNo}</span></p>
            <p className="mb-2 font-bold">Gender: <span className="font-normal">{doctorDetails.gender}</span></p>
            {/* <p className="mb-2 font-bold">Abha ID: <span className="font-normal">{adminDetails.abhaId}</span></p> */}
            {/* <p className="mb-2 font-bold">Speciality: <span className="font-normal">{adminDetails.speciality}</span></p> */}
            {/* <p className="mb-2 font-bold">Experience: <span className="font-normal">{adminDetails.experience} years</span></p> */}
            <p className="mb-2 font-bold">Email: <span className="font-normal">{doctorDetails.email}</span></p>
            <p className="mb-2 font-bold">Status: {doctorDetails.status ? 'Active' : 'Inactive'}</p>
            <br />
            <div className="mt-3">
              {/* Add buttons with respective functionalities */}
              <button 
              // className="btn btn-primary me-2" 
              type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              
              onClick={handleUpdateDetails}>Update Details</button>
              <button 
              // className="btn btn-primary me-2" 
              type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              
              onClick={handleChangePassword}>Change Password</button>
              {role !== 'DOCTOR' && (
                <>
                  {doctorDetails.status === true ? (
                    <button 
                    // className="btn btn-danger me-2" 
                    type="submit"
                  className="button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              
                    onClick={() => handleDeactivateDoctor(doctorDetails.email)}>Deactivate</button>
                  ) : (
                    <button 
                    // className="btn btn-success me-2" 
                    type="submit"
                  className="button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              
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
