import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const AddLoginCred = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "doctor",
    status: true,
  });

  //   const { email, password } = formData;
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log("Form Data:", formData); // Log formData before sending it to the backend
  
      const response = await axios.post('http://localhost:9191/staff/addLogin',
        formData
      );
      console.log("Response from addLogin backend:", response.data);
  
      // Call onSuccess callback to notify parent component
      onSuccess();
  
      // Optionally handle success response, reset form, etc.
    } catch (error) {
      console.error("Error:", error); // Log any errors
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
      <form style={{ width: "50%", marginTop: "2rem" }} onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <TextField
            className="text-fields"
            id="email"
            label="email"
            variant="outlined"
            size="small"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={formData.password} // Use formData.password as the value
            onChange={handleChange} // Use handleChange function to update the password in the state
            style={{ marginBottom: "2rem", width: "100%" }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddLoginCred;
