import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import patientImage from '../../assets/PatientPage.png';

export const AddAppointment = () => {
  // const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [abhaId, setAbhaId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors list from API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:9191/receptionist/doctorList");
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get current time in 'HH:MM:SS' format
      const appointmentData = {
        date: currentDate,
        time: currentTime,
        reasonForVisit: reason,
        status: "pending",
        abhaId: "",
        doctorId: selectedDoctor
      };
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:9191/receptionist/addAppointment", appointmentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response.data);
      navigate('/receptionist/adhaar-otp-verification');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt='patientImage' />
          <div className="dashboard-name-patient" >ADD APPOINTMENT</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Enter <br /> Appointment Details
          </label>
          <TextField
            id="abhaId"
            label="Abha ID"
            value={reason}
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={(e) => setAbhaId(e.target.value)}
            required
          />
          <TextField
            id="reason"
            label="Reason For Visit"
            value={reason}
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <Select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            displayEmpty
            style={{ marginBottom: "2rem", width: "50%" }}
          >
            <MenuItem value="" disabled>
              Select Doctor
            </MenuItem>
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>{doctor.name}</MenuItem>
            ))}
          </Select>
          <button
            type="submit"
            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={handleSubmit}>Add Appointment</button>
        </div>
      </div>
    </div>
  );
}
