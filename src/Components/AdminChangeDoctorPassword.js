
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests

export const AdminChangeDoctorPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor; // Using optional chaining to handle null value
  const email = doctor?.email;
  // const [email, setEmail] = useState(""); // State for email input field
  const [newPassword, setNewPassword] = useState(""); // State for new password input field
  const [error, setError] = useState(null); // State to store error message
  const [success, setSuccess] = useState(false); // State to indicate successful password change



  // const [formData, setFormData] = useState({
  //   email: email,
  //   newpassword: newPassword
  // });

;  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      localStorage.clear();
    }
  }, [])





  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = { 
        email: email,
        newPassword: newPassword
       };
      // Send email and new password to backend
      const response = await axios.post(
        "http://localhost:9191/doctor/changePassword",
        formData,
        // {
        //   newPassword: newPassword,
        // },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true); // Set success state to true upon successful password change
      // Clear form fields
      // setEmail("");
      // setNewPassword("");
    } catch (error) {
      setError(error.response.data.message); // Set error state if password change fails
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleChangePassword}>
        {/* <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
        </div> */}
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // Update new password state on change
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if present */}
        {success && <p style={{ color: "green" }}>Password changed successfully!</p>} {/* Display success message if password change is successful */}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};
























// import React, { useState } from "react";
// import axios from "axios";

// export const AdminPasswordChange = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:9191/admin/changePassword",
//         {
//           oldPassword: oldPassword,
//           newPassword: newPassword,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSuccess(true);
//       // Clear form fields
//       setOldPassword("");
//       setNewPassword("");
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Change Password</h1>
//       <form onSubmit={handleChangePassword}>
//         <div>
//           <label htmlFor="oldPassword">Old Password:</label>
//           <input
//             type="password"
//             id="oldPassword"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="newPassword">New Password:</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {success && <p style={{ color: "green" }}>Password changed successfully!</p>}
//         <button type="submit">Change Password</button>
//       </form>
//     </div>
//   );
// };

