import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../../Config/config";

export const AAForm = ({ email }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    mobileNo: "",
    email: email,
    role: "ADMIN",
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
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      // alert("Invalid email format");
      return;
    }

    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!formData.mobileNo || !mobileRegex.test(formData.mobileNo)) {
      toast.error("Please enter 10 digits Mobile number.");
      return;
    }

    if (!formData.dob) {
      toast.error("Date of birth is required");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      };

      const response = await axios.post(
        `${API_URL}/admin/addAdmin`,
        formData,
        { headers: headers }
      );
      toast.success("Admin added successfully!");
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (error) {
      // console.error("Error:", error);
      toast.error("Failed to add admin!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "2rem",
      }}
    >
      <div className="flex">
        <label className="text-login fw-bold text-center ">
          ADD ADMIN <br></br> DETAILS
        </label>
      </div>
      <form style={{ width: "100%" }}>
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

        <div style={{ marginBottom: "2rem" }}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              name="gender"
              labelId="gender-label"
              id="gender"
              label="Gender"
              size="medium"
              onChange={handleChangeGender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>

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
          inputProps={{
            max: "2000-12-31",
            min: "1900-01-01",
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
