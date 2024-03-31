// import React, { useState } from 'react';
// import axios from 'axios';
// import { useLocation,useNavigate } from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// export const AbhaIdDisplayAndAdd = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const initialFormData = location.state;
//   const [formData, setFormData] = useState(initialFormData);




//   // const doctorDetails = location.state?.doctor; // Using optional chaining to handle null value
//   // const email = doctorDetails?.email;
//   // const [newSpeciality, setNewSpeciality] = useState(doctorDetails?.speciality); // State for new speciality input field
//   // const [newMobileNo, setNewMobileNo] = useState(doctorDetails?.mobileNo); // State for new mobile number input field
//   // const [newExperience, setNewExperience] = useState(doctorDetails?.experience); // State for new experience input field
//   // const [error, setError] = useState(null); // State to store error message
//   // const [success, setSuccess] = useState(false); // State to indicate successful doctor details update







//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");


//       // const formData = {
//       //   email: email,
//       //   speciality: newSpeciality,
//       //   mobileNo: newMobileNo,
//       //   experience: newExperience,
//       // };



//       const response = await axios.post(
//         "localhost:9191/receptionist/addPatient", 
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log('Response:', response.data);
//       navigate('/receptionist');
//       // Optionally, handle success response (e.g., show success message)
//     } catch (error) {
//       console.error('Error:', error);
//       // Optionally, handle error (e.g., show error message)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         name="name"
//         label="Name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="mobileNo"
//         label="Mobile Number"
//         value={formData.mobileNo}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="dob"
//         label="Date of Birth"
//         type="date"
//         value={formData.dob}
//         onChange={handleChange}
//         required
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <TextField
//         name="gender"
//         label="Gender"
//         value={formData.gender}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="bloodGroup"
//         label="Blood Group"
//         value={formData.bloodGroup}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="address"
//         label="Address"
//         value={formData.address}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         name="abhaId"
//         label="Abha ID"
//         value={formData.abhaId}
//         readOnly
//         onChange={handleChange}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Save Changes
//       </Button>
//     </form>
//   );
// };




























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const AbhaIdDisplayAndAdd = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting data from location state
  const defaultValue = location.state;
  console.log('Location State:', defaultValue);
  // const { firstName, lastName, mobile, dayOfBirth, monthOfBirth, yearOfBirth, gender, healthIdNumber } = location.state;

  // Initializing state with extracted data
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
      console.log("bc:",formData);
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
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="mobileNo"
        label="Mobile Number"
        value={formData.mobileNo}
        onChange={handleChange}
        required
      />
      <TextField
        name="dob"
        label="Date of Birth"
        // type="date"
        value={formData.dob}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="gender"
        label="Gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />
      <TextField
        name="bloodGroup"
        label="Blood Group"
        value={formData.bloodGroup}
        onChange={handleChange}
        required
      />
      <TextField
        name="address"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <TextField
        name="abhaId"
        label="Abha ID"
        value={formData.abhaId}
        readOnly
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};
