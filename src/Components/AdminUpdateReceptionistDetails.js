import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
// import admin from "../assets/AdminPage.jpg";
import receptionistImage from '../assets/ReceptionistPage.png';
import { useLocation, useNavigate } from "react-router-dom";

export const AdminUpdateReceptionistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const staffDetails = location.state?.staff;
  //   // console.log('Doctor details:', doctorDetails);
  const email = staffDetails?.email; // State for doctor's email
  //   const [newSpeciality, setNewSpeciality] = useState(doctorDetails.speciality); // State for new speciality input field
  const [newMobileNo, setNewMobileNo] = useState(staffDetails?.mobileNo); // State for new mobile number input field
  //   const [newExperience, setNewExperience] = useState(doctorDetails.experience); // State for new experience input field
  const [error, setError] = useState(null); // State to store error message
  const [success, setSuccess] = useState(false); // State to indicate successful doctor details update

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // if (!doctorDetails) {
    //   navigate("/");
    // }
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      localStorage.clear();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = {
        email: email,
        mobileNo: newMobileNo,
      };
      console.log("Form data:", formData);
      // Send doctor details update request to backend
      const response = await axios.post(
        "http://localhost:9191/receptionist/updateReceptionist",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true); // Set success state to true upon successful doctor details update
      // Clear form fields
      // setEmail('');
      // setNewMobileNo('');
    } catch (error) {
      console.error("Error updating doctor details:", error);
      setError(error.response.data.message); // Set error state if doctor details update fails
    }
  };

  //   // const handleTextFieldChange = (event) => {
  //   //   const { id, value } = event.target;
  //   //   setformData({ ...formData, [id]: value });
  //   // };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">

     
        <div className="flex justify-center items-center">
          <div className="image-container">
            <img src={receptionistImage} className="admin-image" />
            <div className="dashboard-name-receptionist" style={{ fontSize: "xx-large" }}>
              UPDATE RECEPTIONIST
            </div>
          </div>
        </div>


    <div className="flex justify-center items-center mt-20 pt-10">
          <div className="container glass-background login-cred">
            
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
      }}
    >
      <div className="flex">
        <label className="text-login fw-bold text-center ">
          Update Receptionist Details
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="email">Email:</label> */}
          <TextField
            type="email"
            label="Email"
            id="email"
            value={staffDetails.email}
            // onChange={(e) => setEmail(e.target.value)} // Update email state on change
            readOnly
          />
        </div>
        <div>
          {/* <label htmlFor="newMobileNo">New Mobile No:</label> */}
          <TextField
            type="text"
            label="New Mobile No"
            id="newMobileNo"
            value={newMobileNo}
            onChange={(e) => setNewMobileNo(e.target.value)} // Update new mobile number state on change
          />
        </div>
        {error && <p style={{ color: "red" }}></p>}{" "}
        {/* Display error message if present */}
        {success && (
          <p style={{ color: "green" }}>
            Receptionist details updated successfully!
          </p>
        )}{" "}
        {/* Display success message if doctor details update is successful */}
        <button
          type="submit"
          className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          Update Details
        </button>
      </form>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};
