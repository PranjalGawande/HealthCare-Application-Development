import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API_URL from "../../Config/config";

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
    doctorLicenseNo: "",
    tokenMax: "",
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
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!formData.mobileNo || !mobileRegex.test(formData.mobileNo)) {
      toast.error("Invalid mobile number format. Please enter 10 digits.");
      return;
    }

    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    if (!formData.dob) {
      toast.error("Date of birth is required");
      return;
    }

    if (!formData.experience || isNaN(formData.experience)) {
      toast.error("Experience must be a number");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      };

      const response = await axios.post(
        `${API_URL}/admin/addDoctor`,
        formData,
        { headers: headers }
      );
      toast.success("Doctor added successfully");

      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (error) {
      toast.error("Failed to add doctor!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "-1rem",
        paddingBottom: "1rem",
      }}
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <TextField
            id="mobileNo"
            label="MobileNo"
            variant="outlined"
            size="small"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleTextFieldChange}
          />

          <FormControl fullWidth style={{ width: "100%" }}>
            <InputLabel
              style={{
                marginTop: "-2px",
                width: "100%",
                height: "20%",
                display: "flex",
                alignItems: "center",
              }}
            >
              Gender
            </InputLabel>
            <Select
              value={formData.gender}
              name="gender"
              labelId="gender-label"
              id="gender"
              label="Gender"
              size="small"
              style={{ width: "100%" }}
              onChange={handleChangeGender}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="O">Other</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
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
              max: "2000-12-31",
              min: "1900-01-01",
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
          <InputLabel
            style={{
              marginTop: "-2px",
              width: "100%",
              height: "20%",
              display: "flex",
              alignItems: "center",
            }}
          >
            Speciality
          </InputLabel>
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
            <MenuItem value="General Physician">General Physician</MenuItem>
            <MenuItem value="ENT Specialist">ENT Specialist</MenuItem>
            <MenuItem value="Cardiologists">Cardiologists</MenuItem>
            <MenuItem value="Dermatologists">Dermatologists</MenuItem>
            <MenuItem value="Neurologist">Neurologist</MenuItem>
            <MenuItem value="Gynecologist">Gynecologist</MenuItem>
            <MenuItem value="Orthopedic">Orthopedic</MenuItem>
            <MenuItem value="Psychiatrist">Psychiatrist</MenuItem>
            <MenuItem value="Ophthalmologist">Ophthalmologist</MenuItem>
            <MenuItem value="Dentist">Dentist</MenuItem>
          </Select>
        </FormControl>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <TextField
            id="doctorLicenseNo"
            label="License Number"
            variant="outlined"
            size="small"
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={handleTextFieldChange}
          />

          <TextField
            id="tokenMax"
            label="Max Tokens"
            variant="outlined"
            size="small"
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={handleTextFieldChange}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="button "
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
