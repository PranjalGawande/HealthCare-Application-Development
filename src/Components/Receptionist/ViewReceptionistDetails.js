import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import recepImage from '../../assets/ReceptionistPage.png';



export const ViewReceptionistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffDetails, setStaffDetails] = useState('');
  const role = localStorage.getItem("role");

  // console.log("Location", location.state.doctor);

  const handleUpdateDetails = () => {
    // Navigate to the update details page
    navigate('/admin/admin-receptionist-details-update', { state: { staff: staffDetails } });
  };

  const handleChangePassword = () => {
    // Navigate to the change password page
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
      // Refresh doctor list after activation
      // const response = await axios.get(
      //   "http://localhost:9191/receptionist/doctorList",
      //   {
      //     headers: headers,
      //   }
      // );
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
      // Refresh doctor list after deactivation
      // const response = await axios.get(
      //   "http://localhost:9191/receptionist/doctorList",
      //   {
      //     headers: headers,
      //   }
      // );
      setStaffDetails(prevStaffDetails => ({
        ...prevStaffDetails,
        status: false // Assuming response.data.status contains the updated status
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
      // Handle the case where doctor details are not available
      navigate('/error'); // Redirect to error page or handle accordingly
    }
    // console.log("doctorDetails",doctorDetails);
  }, [location.state, navigate]);
  // console.log("staffDetails", staffDetails);


  const determineFontSize = () => {
    if (staffDetails.name && staffDetails.name.length > 14) {
      return '2rem'; // Decrease font size if more than 5 words
    }
    return '3rem'; // Default font size
  };

  // const [doctorDetails, setDoctorDetails] = useState(props.doctor);
  // console.log("props", props.doctor);

  //   // useEffect(() => {
  //   //   // Handle the case where doctorDetails might change
  //   //   setDoctorDetails(props.doctor);
  //   // }, [props.doctor]);
  //   // const doctordata = route.params.doctor;
  //   // const { doctor } = useParams();
  //   // console.log("props", props);
  //   // console.log("props Location", props.location.state);
  //   // console.log(location, "useLocation hook");
  //   // console.log(doctor);
  //   // const [doctorDetails, setDoctorDetails] = useState(null);
  //   // const navigate = useNavigate();

  //   // useEffect(() => {
  //   //   console.log("ViewDoctorDetails component mounted");
  //   //   // Function to fetch admin details if not received from props
  //   //   const fetchDoctorDetails = async () => {
  //   //     try {
  //   //       const token = localStorage.getItem("token");
  //   //       // const formData = { email: };
  //   //       // console.log("Form Data:", formData);
  //   //       // const response = await axios.get("http://localhost:9191/doctor/doctorDetails", {
  //   //       //   // formData,
  //   //       //   headers: { Authorization: `Bearer ${token}` },
  //   //       // });
  //   //       // setDoctorDetails(response.data);
  //   //     } catch (error) {
  //   //       console.error("Error fetching doctor details:", error);
  //   //     }
  //   //   };

  //   //   // Check if admin details are received as props
  //   //   // If not, fetch them using the handler
  //   //   if (!doctorDetails) {
  //   //     // fetchDoctorDetails();
  //   //   }
  //   // }, [doctorDetails]); // Re-fetch admin details if adminDetails state changes

  //   // return (
  //   //   <div className="container glass-background mt-5">
  //   //     <label className="text-login fw-bold text-center">
  //   //       DOCTOR DETAILS
  //   //     </label>
  //   //     {doctorDetails && (
  //   //       <div>
  //   //         <p className="mb-2">Doctor Id: {doctorDetails.doctorId}</p>
  //   //         <p className="mb-2">Name: {doctorDetails.name}</p>
  //   //         <p className="mb-2">Date of Birth: {new Date(doctorDetails.dob).toLocaleDateString()}</p>
  //   //         <p className="mb-2">Mobile No: {doctorDetails.mobileNo}</p>
  //   //         <p className="mb-2">Gender: {doctorDetails.gender}</p>
  //   //         <p className="mb-2">Abha ID: {doctorDetails.abhaId}</p>
  //   //         <p className="mb-2">Speciality: {doctorDetails.speciality}</p>
  //   //         <p className="mb-2">Experience: {doctorDetails.experience} years</p>
  //   //         <p className="mb-2">Email: {doctorDetails.email}</p>
  //   //         <br></br>
  //   //         <div className="mt-3">
  //   //           {/* Add buttons with respective functionalities */}
  //   //           <button className="btn btn-primary me-2" onClick={handleUpdateDetails}>Update Details</button>
  //   //           <button className="btn btn-primary me-2" onClick={handleChangePassword}>Change Password</button>
  //   //           <button className="btn btn-success me-2" onClick={handleActivateDoctor}>Activate</button>
  //   //           <button className="btn btn-danger me-2" onClick={handleDeactivateDoctor}>Deactivate</button>
  //   //         </div>
  //   //       </div>
  //   //     )}
  //   //   </div>
  //   // );



  return (
    // <div className="container glass-background mt-5">
    //   <label className="text-login fw-bold text-center">
    //     RECEPTIONIST DETAILS
    //   </label>
    //   {staffDetails && (
    //     <div>
    //       {/* <p className="mb-2">Doct Id: {staffDetails.doctorId}</p> */}
    //       <p className="mb-2">Name: {staffDetails.name}</p>
    //       <p className="mb-2">Date of Birth: {new Date(staffDetails.dob).toLocaleDateString()}</p>
    //       <p className="mb-2">Mobile No: {staffDetails.mobileNo}</p>
    //       <p className="mb-2">Gender: {staffDetails.gender}</p>
    //       {/* <p className="mb-2">Abha ID: {staffDetails.abhaId}</p> */}
    //       {/* <p className="mb-2">Speciality: {staffDetails.speciality}</p>
    //       <p className="mb-2">Experience: {staffDetails.experience} years</p> */}
    //       <p className="mb-2">Email: {staffDetails.email}</p>
    //       <p className="mb-2">Status: {staffDetails.status ? 'Active' : 'Inactive'}</p>
    //       <br />
    //       <div className="mt-3">
    //         {/* Add buttons with respective functionalities */}
    //         <button className="btn btn-primary me-2" onClick={handleUpdateDetails}>Update Details</button>
    //         <button className="btn btn-primary me-2" onClick={handleChangePassword}>Change Password</button>
    // {role !== 'Receptionist' && (
    //     <>
    //       {staffDetails.status === true ? (
    //         <button className="btn btn-danger me-2" onClick={() => handleDeactivateDoctor(staffDetails.email)}>Deactivate</button>
    //       ) : (
    //         <button className="btn btn-success me-2" onClick={() => handleActivateDoctor(staffDetails.email)}>Activate</button>
    //       )}
    //     </>
    //   )}
    //       </div>
    //     </div>
    //   )}
    // </div>


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
              {/* <p className="mb-2 font-bold">Abha ID: <span className="font-normal">{adminDetails.abhaId}</span></p> */}
              {/* <p className="mb-2 font-bold">Speciality: <span className="font-normal">{adminDetails.speciality}</span></p> */}
              {/* <p className="mb-2 font-bold">Experience: <span className="font-normal">{adminDetails.experience} years</span></p> */}
              <p className="mb-2 font-bold">Email: <span className="font-normal">{staffDetails.email}</span></p>
              <p className="mb-2 font-bold">Status: {staffDetails.status ? 'Active' : 'Inactive'}</p>
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
                {role !== 'Receptionist' && (
                  <>
                    {staffDetails.status === true ? (
                      <button 
                      // className="btn btn-danger me-2" 
                      type="submit"
                  className="button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                
                      onClick={() => handleDeactivateDoctor(staffDetails.email)}>Deactivate</button>
                    ) : (
                      <button 
                      // className="btn btn-success me-2" 
                      type="submit"
                  className="button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                
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





  // return (
  //   <div className="h-full flex justify-center items-center">
  //     <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid">
  //       <div className="image-container">
  //         <img src={recepImage} className="admin-image" alt="Admin" />
  //         <div className="dashboard-name-receptionist" style={{ fontSize: determineFontSize() }}>{staffDetails.name}</div>
  //       </div>
  //       <div className="container glass-background mt-5">
  //         <label className="text-login fw-bold text-center">Profile Details</label>
  //         {staffDetails && (
  //           <div className="flex flex-col text-2xl">
  //             <p className="mb-2 font-bold">Name:<span className="font-normal"> {staffDetails.name}</span></p>
  //             <p className="mb-2 font-bold">Date of Birth: <span className="font-normal">{new Date(staffDetails.dob).toLocaleDateString()}</span></p>
  //             <p className="mb-2 font-bold">Mobile No: <span className="font-normal">{staffDetails.mobileNo}</span></p>
  //             <p className="mb-2 font-bold">Gender: <span className="font-normal">{staffDetails.gender}</span></p>
  //             <p className="mb-2 font-bold">Email: <span className="font-normal">{staffDetails.email}</span></p>
  //             <p className="mb-2 font-bold">Status: {staffDetails.status ? 'Active' : 'Inactive'}</p>
  //             <br />
  //             <div className="mt-3 flex justify-between"> {/* Added flex and justify-between to align buttons in a row */}
  //               {/* Add buttons with respective functionalities */}
  //               <button
  //                 type="submit"
  //                 className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  //                 onClick={handleUpdateDetails}
  //               >Update Details</button>
  //               <button
  //                 type="submit"
  //                 className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  //                 onClick={handleChangePassword}
  //               >Change Password</button>
  //               {role !== 'Receptionist' && (
  //                 <>
  //                   {staffDetails.status === true ? (
  //                     <button
  //                       type="submit"
  //                       className="button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  //                       onClick={() => handleDeactivateDoctor(staffDetails.email)}
  //                     >Deactivate</button>
  //                   ) : (
  //                     <button
  //                       type="submit"
  //                       className="button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  //                       onClick={() => handleActivateDoctor(staffDetails.email)}
  //                     >Activate</button>
  //                   )}
  //                 </>
  //               )}
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  
};






// import React from 'react'

// export const ViewReceptionistDetails = () => {
//   return (
//     <div>ViewReceptionistDetails</div>
//   )
// }
