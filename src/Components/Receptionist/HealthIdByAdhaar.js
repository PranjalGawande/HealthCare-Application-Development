import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import patientImage from '../../assets/PatientPage.png';

export const HealthIdByAdhaar = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = {
        "consent": true,
        "consentVersion": "v1.0"
      };
      const response = await axios.post("http://localhost:9191/receptionist/createHealthIdByAadhaar",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Response:', response.data);
      navigate('/receptionist/abha-id-display-and-add', { state: response.data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" />
          <div className="dashboard-name-patient" >ABHA CREATION</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Click Only if Patient Gives Consent
          </label>
          <button
            type="submit"
            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={handleSubmit}>Click Here</button>
        </div>
      </div>
    </div>
  );
}
