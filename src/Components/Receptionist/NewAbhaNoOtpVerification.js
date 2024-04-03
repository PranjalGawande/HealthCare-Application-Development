import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';

export const NewAbhaNoOtpVerification = () => {
  const [abhaOtp, setAbhaOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(abhaOtp);
    try {
      const token = localStorage.getItem("token");
      const formData = {
        otp: abhaOtp
      };
      const response = await axios.post("http://localhost:9191/receptionist/verifyAbdmOtp",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Response:', response.data);
      navigate('/receptionist/health-id-adhaar');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <TextField
    //     id="abhaOtp"
    //     label="Abha Otp"
    //     value={abhaOtp}
    //     onChange={(e) => setAbhaOtp(e.target.value)}
    //     required
    //   />
    //   <button
    //       type="submit"
    //       className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    //       style={{marginBottom: '-100px', marginTop: '1rem', width: "100%", height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    //     >Submit</button>
    // </form>


    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" />
          <div className="dashboard-name-patient" >ABHA CREATION</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Enter Abha <br /> Mobile Number OTP
          </label>
          <TextField
            id="abhaOtp"
            label="Abha Otp"
            value={abhaOtp}
            onChange={(e) => setAbhaOtp(e.target.value)}
            required
            style={{ marginBottom: "2rem", width: "50%" }}
          />
          {/* Add buttons with respective functionalities */}
          <button
            // className="btn btn-primary me-2" 
            type="submit"
            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

            onClick={handleSubmit}>Submit</button>


        </div>

      </div>
    </div>
  );
}
