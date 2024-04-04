import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PatientHistoryPopup } from "./PatientHistoryPopup";
import doctorImage from "../../assets/DoctorPage.png";

const CNForm = ({ patientId, doctorId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appToken, setAppToken] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  console.log("Apptoken: ", appToken);

  const [formData, setFormData] = useState({
    symptoms: "",
    bloodPressure: "",
    oxygenLevel: "",
    pulse: "",
    medicine: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log("formdata: ", formData);
    console.log("appToken: ", appToken);
  };

  useEffect(() => {
    if (location.state && location.state.appToken) {
      setAppToken(location.state.appToken);
    } else {
      console.log("No token found");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (appToken) {
      fetchPatientHistory(appToken);
    }
  }, [appToken]);

  const fetchPatientHistory = async (appToken) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://localhost:9191/doctor/history/${appToken}`,
        { headers: headers }
      );
      console.log(response);
      setPatientHistory(response.data);
    } catch (error) {
      console.error("Error fetching patient history:", error.message);
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicine = [...formData.medicine];
    updatedMedicine[index] = value;
    setFormData({ ...formData, medicine: updatedMedicine });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicine: [...formData.medicine, ""],
    });
  };

  const removeMedicine = (index) => {
    const updatedMedicine = [...formData.medicine];
    updatedMedicine.splice(index, 1);
    setFormData({ ...formData, medicine: updatedMedicine });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!appToken) {
        console.error("Appointment token not found");
        return;
      }
      console.log("formdata: ", formData);
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `http://localhost:9191/doctor/addPatientRecord/${appToken}`,
        formData,
        { headers: headers }
      );

      if (response.status !== 200) {
        throw new Error("Failed to submit consultation form");
      } else {
        console.log("response: ", response);
      }

      // Handle success
      console.log("Consultation form submitted successfully");
    } catch (error) {
      console.error("Error submitting consultation form:", error.message);
    }
  };

  const handleViewPatientHistory = () => {
    setShowPopup(true);
  };

  const handleRequestConsent = () => {
  };

  return (
    <div className="">
      <div className="background-appointment flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container">
            <img src={doctorImage} className="admin-image" alt="doctorImage"/>
            <div
              className="dashboard-name-doctor"
              style={{ fontSize: "40px" }}
            >
              CONSULTATION FORM
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20 pt-10">
          <div className="container glass-background login-cred" style={{ height: "auto", marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "2rem",
                width: "100%",
                overflowY: "auto",
              }}
            >
              <div className="flex">
                <label className="fw-bold text-center mb-4">
                  Consultation Form
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    id="symptoms"
                    label="Symptoms"
                    variant="outlined"
                    size="medium"
                    style={{ marginBottom: "1rem", width: "100%" }}
                    value={formData.symptoms}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    id="bloodPressure"
                    label="Blood Pressure"
                    variant="outlined"
                    size="medium"
                    style={{ marginBottom: "1rem", width: "100%" }}
                    value={formData.bloodPressure}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    id="oxygenLevel"
                    label="Oxygen Level"
                    variant="outlined"
                    size="medium"
                    style={{ marginBottom: "1rem", width: "100%" }}
                    value={formData.oxygenLevel}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    id="pulse"
                    label="Pulse"
                    variant="outlined"
                    size="medium"
                    style={{ marginBottom: "1rem", width: "100%" }}
                    value={formData.pulse}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <div className="mb-2">
                    <TextField
                      type="text"
                      value={formData.medicine[0]}
                      onChange={(e) => handleMedicineChange(0, e.target.value)}
                      style={{ marginBottom: "1rem", width: "100%" }}
                      placeholder="Medicine Name"
                    />
                  </div>
                  {formData.medicine.slice(1).map((medicineName, index) => (
                    <div key={index} className="mb-2">
                      <TextField
                        type="text"
                        value={medicineName}
                        onChange={(e) => handleMedicineChange(index + 1, e.target.value)}
                        style={{ marginBottom: "1rem", width: "100%", marginRight: "10px" }}
                        placeholder="Medicine Name"
                      />
                      <button
                        type="button"
                        className="button"
                        onClick={() => removeMedicine(index + 1)}
                        style={{ height: "fit-content" }}
                      >
                        Remove
                      </button>
                    </div>

                  ))}
                  <button
                    onClick={addMedicine}
                    type="button"
                    className="button"
                    style={{ marginTop: "2rem", width: "100%" }}
                  >
                    Add Medicine
                  </button>
                </div>
              </form>
              <div style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  className="button"
                  style={{ marginTop: "2rem", width: "100%" }}
                  onClick={handleRequestConsent}
                >
                  Request Consent
                </button>
              </div>
              {
                <PatientHistoryPopup
                  title="Patient History"
                  onClose={() => setShowPopup(false)}
                  patientHistory={patientHistory}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNForm;