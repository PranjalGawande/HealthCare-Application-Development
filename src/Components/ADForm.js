import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";

export const ADForm = ({ email }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    experience: "",
    speciality: "",
    address: "",
    dob: "",
    mobileNo: "",
    email: email,
  });

  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleChangeGender = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeSpeciality = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Log formData before sending it to the backend
      console.log("Form Data:", formData);

      const response = await axios.post(
        "http://localhost:9191/admin/addDoctor",
        formData,
        { headers: headers }
      );
      console.log("Response from backend:", response.data);
      alert("Doctor added successfully");
      navigate("/admin");
      // Optionally handle success response
    } catch (error) {
      console.error("Error:", error);
      // Optionally handle error
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: '2rem'}}
    >
      <div className="flex">
        <label className="text-login fw-bold text-center ">
          ADD DOCTOR <br></br> DETAILS
        </label>
      </div>
      <form style={{ width: "90%" }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          size="small"
          style={{ marginBottom: "2rem", width: "100%" }}
          onChange={handleTextFieldChange}
        />

        <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem"}}>
          <TextField
            id="mobileNo"
            label="MobileNo"
            variant="outlined"
            size="small"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleTextFieldChange}
          />

          <FormControl fullWidth>
            <InputLabel style={{marginTop: "-2px", width: "100%",height: "20%",  display: 'flex', alignItems: 'center'}}>Gender</InputLabel>
            <Select
              value={formData.gender}
              name="gender"
              labelId="gender-label"
              id="gender"
              label="Gender"
              size="small"
              style={{width: "100%" }}
              onChange={handleChangeGender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem"}}>
        <TextField
          id="dob"
          label="Date of Birth"
          type="date"
          variant="outlined"
          size="small"
          style={{ marginBottom: "2rem", width: "50%" }}
          value={formData.dob}
          onChange={handleTextFieldChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            // Specify the format for the date input
            max: '2000-12-31', // YYYY-MM-DD format
            min: '1900-01-01', // YYYY-MM-DD format
          }}
        />

          <TextField
            id="experience"
            label="Experience"
            variant="outlined"
            size="small"
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={handleTextFieldChange}
          />
        </div>
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          size="small"
          style={{ marginBottom: "2rem", width: "100%" }}
          onChange={handleTextFieldChange}
        />
        <FormControl fullWidth>
          <InputLabel style={{marginTop: "-2px", width: "100%",height: "20%",  display: 'flex', alignItems: 'center'}}>Speciality</InputLabel>
          <Select
            value={formData.speciality}
            name="speciality"
            labelId="speciality-label"
            id="speciality"
            label="Speciality"
            size="small"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleChangeSpeciality}
          >
            <MenuItem value="Cardiology">Cardiology</MenuItem>
            <MenuItem value="Dermatology">Dermatology</MenuItem>
            <MenuItem value="Endocrinology">Endocrinology</MenuItem>
          </Select>
        </FormControl>

        

        <button
          type="button"
          onClick={handleSubmit}
          className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          style={{marginBottom: '-100px', marginTop: '1rem', width: "100%", height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          Register
        </button>
      </form>
    </div>
  );
};
