import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PatientHistoryPopup } from "./PatientHistoryPopup";
import doctorImage from "../../assets/DoctorPage.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

const CNForm = ({ patientId, doctorId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appToken, setAppToken] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");


  // console.log("Apptoken: ", appToken);

  const [formData, setFormData] = useState({
    symptoms: "",
    bloodPressure: "",
    oxygenLevel: "",
    pulse: "",
    diagnosis: "",
    prescriptions: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // console.log("formdata: ", formData);
    // console.log("appToken: ", appToken);
  };

  useEffect(() => {
    if (location.state && location.state.appToken) {
      setAppToken(location.state.appToken);
    } else {
      // console.log("No token found");
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
      // console.log(response);
      setPatientHistory(response.data);
    } catch (error) {
      // console.error("Error fetching patient history:", error.message);
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicine = [...formData.medicine];
    updatedMedicine[index] = value;
    setFormData({ ...formData, medicine: updatedMedicine });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!appToken) {
        toast.error("Appointment token not found");
        // console.error("Appointment token not found");
        return;
      }
      // console.log("formdata: ", formData);
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
        toast.error("Failed to submit consultation form");
        throw new Error("Failed to submit consultation form");
      } else {
        toast.success("Consultation form submitted successfully");
        setTimeout(() => {
          navigate("/doctor/view-appointments");
        }, 2000);
        // console.log("response: ", response);
      }

      // console.log("Consultation form submitted successfully");
    } catch (error) {
      toast.error("Error submitting consultation form");
      // console.error("Error submitting consultation form:", error.message);
    }
  };

  const handleViewPatientHistory = () => {
    setShowPopup(true);
  };

  // const handleRequestConsent = () => {
  // };
const handleprescriptionSubmit = () => {
    const prescriptions = {
      medicine,
      dosage,
      frequency,
      duration: parseInt(duration)
    };

    // console.log("Prescriptions:", prescriptions);
    setFormData({
      ...formData,
      prescriptions: [...formData.prescriptions, prescriptions],
    });

    toast.success("Prescription added successfully");
    

  };

  return (
    <div className="">
      <div className="background-appointment flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container md:block hidden pl-2">
            <img src={doctorImage} className="admin-image" alt="doctorImage" />
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
                  <TextField
                    id="diagnosis"
                    label="Diagnosis"
                    variant="outlined"
                    size="medium"
                    style={{ marginBottom: "1rem", width: "100%" }}
                    value={formData.diagnosis}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  className="button "
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "10px", paddingBottom: "10px"
                  }}
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  {"Add Prescription"}
                </Button>

                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Add Prescription
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TextField
                      type="text"
                      label="Medicine"
                      value={medicine}
                      onChange={(e) => setMedicine(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="text"
                      label="Dosage"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="text"
                      label="Frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="number"
                      label="Duration (in days)"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <button className="btn btn-primary" onClick={handleprescriptionSubmit}>
                      Add Prescription
                    </button>
                  </Modal.Body>

                </Modal>

                <div style={{ marginTop: "1rem" }}>
                  <button
                    type="submit"
                    className="button"
                    style={{ marginTop: "2rem", width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
                  // onClick={handleRequestConsent}
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div>
                {
                  <PatientHistoryPopup
                    type="button"
                    className="button"
                    title="Patient History"
                    onClose={() => setShowPopup(false)}
                    patientHistory={patientHistory}
                    style={{ marginTop: "2rem", width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNForm;