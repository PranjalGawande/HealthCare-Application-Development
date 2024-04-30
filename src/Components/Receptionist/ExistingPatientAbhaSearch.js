import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import toast from "react-hot-toast";
import API_URL from "../Config/config";

export const ExistingPatientAbhaSearch = () => {
  const [abhaId, setAbhaId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!abhaId.trim()) {
      toast.error("Abha Address field is empty");
      setLoading(false);
      return;
    }

    if (!abhaId.trim().endsWith("@sbx")) {
      toast.error("Invalid Abha Address");
      setLoading(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const formData = { abhaId };
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${API_URL}/receptionist/patientDetails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (response.data === "") {
        toast.error("Patient not found");
        setLoading(false);
        return;
      }
      console.log("Response:", response);
      const patientDetails = {
        abhaId: response.data.abhaId,
        address: response.data.address,
        bloodGroup: response.data.bloodGroup,
        dob: response.data.dob,
        gender: response.data.gender,
        mobileNo: response.data.mobileNo,
        name: response.data.name,
      };
      sessionStorage.setItem("abhaAddress", abhaId);
      navigate("/receptionist/existing-patient-details", {
        state: { patientDetails },
      });
    } catch (error) {
      toast.error("Error searching for patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex admin-dashboard justify-evenly items-center border-amber-300 border-solid">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt="patientImage" />
          <div className="dashboard-name-patient">ABHA SEARCH</div>
        </div>
        <div className="container glass-background mt-5">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="text-login fw-bold text-center mb-2">
              Enter Abha Address
            </label>
            <TextField
              id="abhaid"
              label="Abha Address"
              value={abhaId}
              style={{ width: "100%", maxWidth: "400px", marginBottom: "1rem" }}
              onChange={(e) => setAbhaId(e.target.value)}
              required
            />
            {loading ? (
              <div className="loader"></div>
            ) : (
              <button
                type="submit"
                className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center"
                style={{ width: "100%", maxWidth: "400px" }}
              >
                Search
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
