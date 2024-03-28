// import React from 'react'

// export const AdminPasswordChange = () => {
//   return (
//     <div>AdminPasswordChange</div>
//   )
// }




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const AdminPasswordChange = () => {
//   const [adminDetails, setAdminDetails] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to fetch admin details if not received from props
//     const fetchAdminDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post("http://localhost:9191/admin/changePassword", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAdminDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching admin details:", error);
//       }
//     };

//     // Check if admin details are received as props
//     // If not, fetch them using the handler
//     if (!adminDetails) {
//       fetchAdminDetails();
//     }
//   }, [adminDetails]); // Re-fetch admin details if adminDetails state changes

//   return (
//     <div className="container glass-background mt-5">
//       <label className="text-login fw-bold text-center">
//             ADMIN DETAILS
//           </label>
//       {adminDetails && (
//         <div>
//           <p className="mb-2">Name: {adminDetails.name}</p>
//           <p className="mb-2">Date of Birth: {new Date(adminDetails.dob).toLocaleDateString()}</p>
//           <p className="mb-2">Mobile No: {adminDetails.mobileNo}</p>
//           <p className="mb-2">Gender: {adminDetails.gender}</p>
//           <p className="mb-2">Abha ID: {adminDetails.abhaId}</p>
//           <p className="mb-2">Email: {adminDetails.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };












import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminPasswordChange = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      localStorage.clear();
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9191/admin/changePassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true);
      // Clear form fields
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Password changed successfully!</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

