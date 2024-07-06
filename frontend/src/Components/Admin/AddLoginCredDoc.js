import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import API_URL from "../../Config/config";

const AddLoginCredDoc = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "DOCTOR",
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
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    };

    try {
      const response = await axios.post(
        `${API_URL}/admin/addLogin`,
        formData,
        { headers: headers }
      );
      onSuccess(formData.email);
    } catch (error) {
      toast.error("Email already exist");
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
          to="/admin/add-doctor"
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

export default AddLoginCredDoc;
