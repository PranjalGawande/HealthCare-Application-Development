// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const ASForm = (email) => {
//   let navigate = useNavigate();
//   const [formData, setformData] = useState({
//     name: "",
//     gender: "",
//     role: "Receptionist",
//     dob: "",
//     mobileNo: "",
//     email: email.email,
//   });

//   const handleTextFieldChange = (event) => {
//     const { id, value } = event.target;
//     setformData({ ...formData, [id]: value });
//   };

//   const handleChangeGender = (event) => {
//     setformData((prevState) => ({
//       ...prevState,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     const token = localStorage.getItem("token");
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     event.preventDefault();

//     try {
//       console.log("Form Data:", formData);

//       const response = await axios.post(
//         "http://localhost:9191/admin/addReceptionist",
//         formData,
//         { headers: headers }
//       );
//       console.log("Response from backend:", response.data);
//       alert("Staff added successfully");
//       navigate("/admin");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         paddingTop: "2rem",
//       }}
//     >
//       <div className="flex">
//         <label className="text-login fw-bold text-center ">
//           ADD ADMIN <br></br> DETAILS
//         </label>
//       </div>
//       <form style={{ width: "80%", marginTop: "2rem" }}>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <TextField
//             id="name"
//             label="Name"
//             variant="outlined"
//             size="medium"
//             style={{ marginBottom: "2rem", width: "100%" }}
//             onChange={handleTextFieldChange}
//           />
//         </div>

//         <FormControl fullWidth>
//           <InputLabel>Gender</InputLabel>
//           <Select
//             value={formData.gender}
//             name="gender"
//             labelId="gender-label"
//             id="gender"
//             label="Gender"
//             size="medium"
//             style={{ marginBottom: "2rem", width: "100%" }}
//             onChange={handleChangeGender}
//           >
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           id="dob"
//           label="Date of Birth"
//           type="date"
//           variant="outlined"
//           size="medium"
//           style={{ marginBottom: "2rem", width: "100%" }}
//           value={formData.dob}
//           onChange={handleTextFieldChange}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           id="mobileNo"
//           label="MobileNo"
//           variant="outlined"
//           size="medium"
//           style={{ marginBottom: "2rem", width: "100%" }}
//           onChange={handleTextFieldChange}
//         />
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//           style={{
//             marginBottom: "-100px",
//             marginTop: "1rem",
//             width: "100%",
//             height: "12%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };







import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ASForm = ({ email }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    role: "Receptionist",
    dob: "",
    mobileNo: "",
    email: email.email,
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

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    event.preventDefault();

    // Validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      alert("Invalid email format");
      return;
    }

    // Validating mobile number
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobileNo || !mobileRegex.test(formData.mobileNo)) {
      alert("Invalid mobile number format. Please enter 10 digits.");
      return;
    }

    // Validating date of birth
    if (!formData.dob) {
      alert("Date of birth is required");
      return;
    }

    try {
      console.log("Form Data:", formData);

      const response = await axios.post(
        "http://localhost:9191/admin/addReceptionist",
        formData,
        { headers: headers }
      );
      console.log("Response from backend:", response.data);
      alert("Staff added successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
          ADD ADMIN <br></br> DETAILS
        </label>
      </div>
      <form style={{ width: "80%", marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            size="medium"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleTextFieldChange}
          />
        </div>

        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={formData.gender}
            name="gender"
            labelId="gender-label"
            id="gender"
            label="Gender"
            size="medium"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleChangeGender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="dob"
          label="Date of Birth"
          type="date"
          variant="outlined"
          size="medium"
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
          size="medium"
          style={{ marginBottom: "2rem", width: "100%" }}
          onChange={handleTextFieldChange}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          style={{
            marginBottom: "-100px",
            marginTop: "1rem",
            width: "100%",
            height: "12%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};
