import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';
import { Progressbar } from "./Progressbar";

export const AbdmOtpCredentials = () => {
  const [abdmOtp, setAbdmOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(abdmOtp);
    try {
      const token = localStorage.getItem("token");
      const formData = {
        otp: abdmOtp
      };
      // console.log('FormData:', formData);

      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:9191/receptionist/confirmAbdmCredentials",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log('Response:', response.data);
      navigate('/receptionist/suggest-abha-address');
    } catch (error) {
      console.error('Error Submitting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Progressbar step={3} />

      <div className="h-full flex justify-center items-center progPageMargin">
        <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
          <div className="image-container">
            <img src={patientImage} className="admin-image" alt='patientImage' />
            <div className="dashboard-name-patient" >ABHA CREATION</div>
          </div>
          <div className="container glass-background mt-5">
            <label className="text-login fw-bold text-center">
              Enter <br /> Abdm OTP
            </label>
            <TextField
              id="abdmOtp"
              label="Abdm Otp"
              value={abdmOtp}
              onChange={(e) => setAbdmOtp(e.target.value)}
              required
              style={{ marginBottom: "2rem", width: "50%" }}
            />
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <div class="loader"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
