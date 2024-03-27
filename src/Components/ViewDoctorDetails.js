import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { route } from "react-router-dom";
import { useLocation } from "react-router-dom";



export const ViewDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);
  // console.log("Location", location.state.doctor);

  const handleUpdateDetails = () => {
    // Navigate to the update details page
    navigate('/admin/admin-doctor-details-update');
  };

  const handleChangePassword = () => {
    // Navigate to the change password page
    navigate('/admin/admin-doctor-password-change');
  };

  const handleActivateDoctor = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `http://localhost:9191/admin/activateStaff/${email}`,
        null,
        { headers: headers }
      );
      // Refresh doctor list after activation
      // const response = await axios.get(
      //   "http://localhost:9191/receptionist/doctorList",
      //   {
      //     headers: headers,
      //   }
      // );
      // setDoctors(response.data);
    } catch (error) {
      console.error("Error activating doctor:", error);
    }
  };

  // const handleDeactivateDoctor = async (email) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios.post(
  //       `http://localhost:9191/admin/deactivateStaff/${email}`,
  //       null,
  //       { headers: headers }
  //     );
  //     // Refresh doctor list after deactivation
  //     // const response = await axios.get(
  //     //   "http://localhost:9191/receptionist/doctorList",
  //     //   {
  //     //     headers: headers,
  //     //   }
  //     // );
  //     // setDoctors(response.data);
  //   } catch (error) {
  //     console.error("Error deactivating doctor:", error);
  //   }
  // };


  const handleDeactivateDoctor = async () => {
    try {
      if (!doctorDetails || !doctorDetails.email) {
        console.error("Doctor details or email not available.");
        return;
      }
  
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios.post(
        `http://localhost:9191/admin/deactivateStaff/${doctorDetails.email}`,
        null,
        { headers: headers }
      );
      // Refresh doctor list after deactivation
      // const response = await axios.get(
      //   "http://localhost:9191/receptionist/doctorList",
      //   {
      //     headers: headers,
      //   }
      // );
      // setDoctors(response.data);
    } catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };
  





  useEffect(() => {
    if (location.state && location.state.doctor) {
      setDoctorDetails(location.state.doctor);
    } else {
      // Handle the case where doctor details are not available
      navigate('/error'); // Redirect to error page or handle accordingly
    }
    console.log(doctorDetails);
  }, [location.state, navigate]);
  // const [doctorDetails, setDoctorDetails] = useState(props.doctor);
  // console.log("props", props.doctor);

  // useEffect(() => {
  //   // Handle the case where doctorDetails might change
  //   setDoctorDetails(props.doctor);
  // }, [props.doctor]);
  // const doctordata = route.params.doctor;
  // const { doctor } = useParams();
  // console.log("props", props);
  // console.log("props Location", props.location.state);
  // console.log(location, "useLocation hook");
  // console.log(doctor);
  // const [doctorDetails, setDoctorDetails] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("ViewDoctorDetails component mounted");
  //   // Function to fetch admin details if not received from props
  //   const fetchDoctorDetails = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       // const formData = { email: };
  //       // console.log("Form Data:", formData);
  //       // const response = await axios.get("http://localhost:9191/doctor/doctorDetails", {
  //       //   // formData,
  //       //   headers: { Authorization: `Bearer ${token}` },
  //       // });
  //       // setDoctorDetails(response.data);
  //     } catch (error) {
  //       console.error("Error fetching doctor details:", error);
  //     }
  //   };

  //   // Check if admin details are received as props
  //   // If not, fetch them using the handler
  //   if (!doctorDetails) {
  //     // fetchDoctorDetails();
  //   }
  // }, [doctorDetails]); // Re-fetch admin details if adminDetails state changes

  // return (
  //   <div className="container glass-background mt-5">
  //     <label className="text-login fw-bold text-center">
  //       DOCTOR DETAILS
  //     </label>
  //     {doctorDetails && (
  //       <div>
  //         <p className="mb-2">Doctor Id: {doctorDetails.doctorId}</p>
  //         <p className="mb-2">Name: {doctorDetails.name}</p>
  //         <p className="mb-2">Date of Birth: {new Date(doctorDetails.dob).toLocaleDateString()}</p>
  //         <p className="mb-2">Mobile No: {doctorDetails.mobileNo}</p>
  //         <p className="mb-2">Gender: {doctorDetails.gender}</p>
  //         <p className="mb-2">Abha ID: {doctorDetails.abhaId}</p>
  //         <p className="mb-2">Speciality: {doctorDetails.speciality}</p>
  //         <p className="mb-2">Experience: {doctorDetails.experience} years</p>
  //         <p className="mb-2">Email: {doctorDetails.email}</p>
  //         <br></br>
  //         <div className="mt-3">
  //           {/* Add buttons with respective functionalities */}
  //           <button className="btn btn-primary me-2" onClick={handleUpdateDetails}>Update Details</button>
  //           <button className="btn btn-primary me-2" onClick={handleChangePassword}>Change Password</button>
  //           <button className="btn btn-success me-2" onClick={handleActivateDoctor}>Activate</button>
  //           <button className="btn btn-danger me-2" onClick={handleDeactivateDoctor}>Deactivate</button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );



  return (
    <div className="container glass-background mt-5">
      <label className="text-login fw-bold text-center">
        DOCTOR DETAILS
      </label>
      {doctorDetails && (
        <div>
          <p className="mb-2">Doctor Id: {doctorDetails.doctorId}</p>
          <p className="mb-2">Name: {doctorDetails.name}</p>
          <p className="mb-2">Date of Birth: {new Date(doctorDetails.dob).toLocaleDateString()}</p>
          <p className="mb-2">Mobile No: {doctorDetails.mobileNo}</p>
          <p className="mb-2">Gender: {doctorDetails.gender}</p>
          <p className="mb-2">Abha ID: {doctorDetails.abhaId}</p>
          <p className="mb-2">Speciality: {doctorDetails.speciality}</p>
          <p className="mb-2">Experience: {doctorDetails.experience} years</p>
          <p className="mb-2">Email: {doctorDetails.email}</p>
          <p className="mb-2">Status: {doctorDetails.status}</p>
          <br />
          <div className="mt-3">
            {/* Add buttons with respective functionalities */}
            <button className="btn btn-primary me-2" onClick={handleUpdateDetails}>Update Details</button>
            <button className="btn btn-primary me-2" onClick={handleChangePassword}>Change Password</button>
            {doctorDetails.status === 1 ? (
              <button className="btn btn-danger me-2" onClick={handleDeactivateDoctor}>Deactivate</button>
            ) : (
              <button className="btn btn-success me-2" onClick={handleActivateDoctor}>Activate</button>
            )}
          </div>
        </div>
      )}
    </div>
  );











};
