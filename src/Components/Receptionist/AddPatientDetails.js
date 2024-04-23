import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import toast from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";
import { Progressbar } from "./Progressbar";

export const AddPatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    mobileNo: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    abhaId: "",
  });

  useEffect(() => {
    if (location.state && location.state.patientInfo) {
      const { name, mobileNo, dob, gender, abhaId } =
        location.state.patientInfo;
      setPatientInfo({
        name,
        mobileNo,
        dob,
        gender,
        bloodGroup: "",
        address: "",
        abhaId,
      });
    } else {
      console.error("Patient info not provided in location state");
    }
  }, [location.state]);

  // Removed handleChange since it's not needed for read-only fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = {
        abhaAddress: patientInfo.abhaId,
        bloodGroup: patientInfo.bloodGroup,
        address: patientInfo.address,
      };
      const response = await axios.post(
        "http://localhost:9191/receptionist/addPatient",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("Response:", response.data);
      toast.success("Patient Added Successfully");
      setTimeout(() => {
        navigate("/receptionist/add-appointment");
      }, 2000);
    } catch (error) {
      toast.error("Error in Adding Patient");
      // console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Progressbar step={3} />
    <div className="h-full flex justify-center items-center progPageMargin pt-2">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt="patientImage" />
          <div className="dashboard-name-patient">ADD PATIENT</div>
        </div>
        <div className="container glass-background mt-5 doctor-details">
          <form onSubmit={handleSubmit} style={{ width: "80%" }}>
            <label
              className="text-login fw-bold text-center"
              style={{ marginTop: "1px" }}
            >
              Enter Patient Details
            </label>
            <TextField
              name="name"
              label="Name"
              value={patientInfo.name}
              style={{ marginBottom: "1rem", width: "100%" }}
              readOnly
              disabled
            />
            <TextField
              name="mobileNo"
              label="Mobile Number"
              value={patientInfo.mobileNo}
              style={{ marginBottom: "1rem", width: "100%" }}
              readOnly
              disabled
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
              }}
            >
              <TextField
                name="dob"
                label="Date of Birth"
                value={patientInfo.dob}
                style={{ marginBottom: "1rem", width: "50%" }}
                readOnly
                disabled
              />
              <TextField
                name="gender"
                label="Gender"
                value={patientInfo.gender}
                style={{ marginBottom: "1rem", width: "50%" }}
                readOnly
                disabled
              />
            </div>
            <TextField
              select
              name="bloodGroup"
              label="Blood Group"
              value={patientInfo.bloodGroup}
              style={{ marginBottom: "1rem", width: "100%" }}
              onChange={handleChange}
              required
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </TextField>
            <TextField
              name="address"
              label="Address"
              value={patientInfo.address}
              style={{ marginBottom: "1rem", width: "100%" }}
              onChange={handleChange}
              required
              // readOnly
              // disabled
            />
            <TextField
              name="abhaId"
              label="Abha ID"
              value={patientInfo.abhaId}
              style={{ marginBottom: "1rem", width: "100%" }}
              readOnly
              disabled
            />
            <div className="d-flex justify-content-center">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="button"
                  style={{
                    marginTop: "2rem",
                    width: "80%",
                    height: "5%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};
