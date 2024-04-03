import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';

export const AbhaIdDisplayAndAdd = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultValue = location.state;
  console.log('Location State:', defaultValue);

  const [formData, setFormData] = useState({
    name: `${defaultValue.firstName} ${defaultValue.lastName}`,
    mobileNo: defaultValue.mobile,
    dob: `${defaultValue.yearOfBirth}-${defaultValue.monthOfBirth}-${defaultValue.dayOfBirth}`,
    gender: defaultValue.gender,
    bloodGroup: "",
    address: "",
    abhaId: defaultValue.healthIdNumber
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("bc:", formData);
      const response = await axios.post(
        "http://localhost:9191/receptionist/addPatient",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Response:', response.data);
      navigate('/receptionist');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt='patientImage' />
          <div className="dashboard-name-patient" >ABHA CREATION</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
            Enter Patient Details
          </label>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            style={{ marginBottom: "1rem", width: "78%" }}
            required
          />
          <div style={{ display: "flex", justifyContent: "space-around", gap: "2rem" }}>
            <TextField
              name="mobileNo"
              label="Mobile Number"
              value={formData.mobileNo}
              onChange={handleChange}
              style={{ marginBottom: "1rem", width: "50%" }}
              required
            />
            <TextField
              name="dob"
              label="Date of Birth"
              // type="date"
              value={formData.dob}
              onChange={handleChange}
              style={{ marginBottom: "1rem", width: "50%" }}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", gap: "2rem" }}>
            <TextField
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              style={{ marginBottom: "1rem", width: "50%" }}
              required
            />
            <TextField
              name="bloodGroup"
              label="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange}
              style={{ marginBottom: "1rem", width: "50%" }}
              required
            />
          </div>
          <TextField
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            style={{ marginBottom: "1rem", width: "78%" }}
            required
          />
          <TextField
            name="abhaId"
            label="Abha ID"
            value={formData.abhaId}
            readOnly
            onChange={handleChange}
            style={{ marginBottom: "1rem", width: "78%" }}
            required
          />
          <button
            type="submit"
            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={handleSubmit}>Click Here</button>
        </div>
      </div>
    </div>
  );
};
