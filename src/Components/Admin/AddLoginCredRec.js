import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

const AddLoginCredRec = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Receptionist",
    status: true,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      console.error("Invalid email format");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      console.error("Password must be at least 6 characters long");
      return;
    }

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      console.log("Form Data:", formData);

      const response = await axios.post(
        "http://localhost:9191/admin/addLogin",
        formData,
        { headers: headers }
      );
      console.log("Response from addLogin backend:", response.data);

      onSuccess(formData.email);
    } catch (error) {
      toast.error("Email already exist");
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="flex">
        <label className="text-login fw-bold text-center ">
          ADD LOGIN <br></br> CREDENTIALS
        </label>
      </div>
      <form
        style={{ width: "100%", marginTop: "2rem" }}
        onSubmit={handleSubmit}
      >
        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            size="medium"
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div style={{ width: "100%" }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="medium"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <button
          type="submit"
          className="button"
          style={{
            height: "fit-content",
            padding: "20px",
            width: "100%",
            color: "white",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLoginCredRec;
