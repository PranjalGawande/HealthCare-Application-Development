// import React, {useState} from 'react'
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// // import { Select } from '@material-ui/core';
// import axios from 'axios';

// export const ADForm = (email) => {

//     const [formData, setFormData] = useState({
//         name: '',
//         gender: '',
//         experience: '',
//         speciality: '',
//         address: '',
//         dob: '',
//         phone: '',
//         email: email
//       });

//       // const handleChange = (event) => {
//       //   setFormData({ ...formData, [event.target.id]: event.target.value });
//       // };

//       const handleChange = (event) => {
//         const {id, value} = event.target;
//         console.log("Field ID:", id);
//         console.log("Field Value:", value);
//         setFormData({ ...formData, [id]: value});
//       };

//       const handleSubmit = async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         try {
//           // Log formData before sending it to the backend
//           console.log('Form Data:', formData);

//           const response = await axios.post('http://localhost:9191/admin/add-doctor', formData);
//           console.log('Response from backend:', response.data);
//           // Optionally handle success response
//         } catch (error) {
//           console.error('Error:', error);
//           // Optionally handle error
//         }
//       };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//     <div className='flex'>
//       <div>------------------------</div>
//       <h2 > ENTER DETAILS </h2>
//       <div>------------------------</div>
//       </div>
//       <form style={{ width: '50%', marginTop: '2rem' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <TextField
//             id="name"
//             label="Name"
//             variant="outlined"
//             size="small"
//             style={{ marginBottom: '2rem', width: '100%' }}
//             onChange={handleChange}
//           />
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           {/* <TextField
//             id="gender"
//             select
//             label="Gender"
//             variant="outlined"
//             size="small"
//             style={{ marginBottom: '2rem', width: '48%' }}
//             onChange={handleChange}
//           >
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </TextField> */}
//           <Select
//           id="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           variant="outlined"
//           size="small"
//           sx={{ marginTop: 35, width: 250 }}
//         >
//           <MenuItem value="male">Male</MenuItem>
//           <MenuItem value="female">Female</MenuItem>
//           <MenuItem value="other">Other</MenuItem>
//         </Select>
//           <TextField
//             id="experience"
//             label="Experience"
//             variant="outlined"
//             size="small"
//             style={{ marginBottom: '2rem', width: '48%' }}
//             onChange={handleChange}
//           />
//         </div>
//         <TextField
//           id="speciality"
//           select
//           label="Speciality"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '2rem', width: '100%' }}
//           onChange={handleChange}
//         >
//           <MenuItem value="Cardiology">Cardiology</MenuItem>
//           <MenuItem value="Dermatology">Dermatology</MenuItem>
//           <MenuItem value="Endocrinology">Endocrinology</MenuItem>
//           {/* Add more specialities as needed */}
//         </TextField>
//         <TextField
//           id="address"
//           label="Address"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '2rem', width: '100%' }}
//           onChange={handleChange}
//         />
//         <TextField
//           id="dob"
//           label="Date of Birth"
//           type="date"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '2rem', width: '100%' }}
//           value={formData.dob}
//           onChange={handleChange}
//         />
//         <TextField
//           id="phone"
//           label="Phone"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '2rem', width: '100%' }}
//           onChange={handleChange}
//         />
//         <button type="button" onClick={handleSubmit} className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>
//       </form>
//     </div>
//   );
// }

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
        { headers: headers}
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
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="flex">
        <div>------------------------</div>
        <h2> ENTER DETAILS </h2>
        <div>------------------------</div>
      </div>
      <form style={{ width: "50%", marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleTextFieldChange}
          />
        </div>
        <TextField
          id="experience"
          label="Experience"
          variant="outlined"
          size="small"
          style={{ marginBottom: "2rem", width: "100%" }}
          onChange={handleTextFieldChange}
        />

        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={formData.gender}
            name="gender"
            labelId="gender-label"
            id="gender"
            label="Gender"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleChangeGender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Speciality</InputLabel>
          <Select
            value={formData.speciality}
            name="speciality"
            labelId="speciality-label"
            id="speciality"
            label="Speciality"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleChangeSpeciality}
          >
            <MenuItem value="Cardiology">Cardiology</MenuItem>
            <MenuItem value="Dermatology">Dermatology</MenuItem>
            <MenuItem value="Endocrinology">Endocrinology</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="address"
          label="Address"
          variant="outlined"
          size="small"
          style={{ marginBottom: "2rem", width: "100%" }}
          onChange={handleTextFieldChange}
        />
        <TextField
          id="dob"
          label="Date of Birth"
          type="date"
          variant="outlined"
          size="small"
          style={{ marginBottom: "2rem", width: "100%" }}
          value={formData.dob}
          onChange={handleTextFieldChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="mobileNo"
          label="MobileNo"
          variant="outlined"
          size="small"
          style={{ marginBottom: "2rem", width: "100%" }}
          onChange={handleTextFieldChange}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};
