import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PatientHistoryPopup } from "./PatientHistoryPopup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import API_URL from "../../Config/config";

const CNForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appToken, setAppToken] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [dosage, setDosage] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [consentId, setConsentId] = useState("");

  const purposes = [
    { code: "CAREMGT", display: "Care Management" },
    { code: "BTG", display: "Break the Glass" },
    { code: "PUBHLTH", display: "Public Health" },
    { code: "HPAYMT", display: "Healthcare Payment" },
    { code: "DSRCH", display: "Disease Specific Healthcare Research" },
    { code: "PATRQT", display: "Self Requested" },
  ];

  const hiTypes = [
    { code: "DiagnosticReport", display: "Diagnostic Report" },
    { code: "Prescription", display: "Prescription" },
    { code: "DischargeSummary", display: "Discharge Summary" },
    { code: "OPConsultation", display: "OP Consultation" },
    { code: "ImmunizationRecord", display: "Immunization Record" },
    { code: "WellnessRecord", display: "Wellness Record" },
    { code: "HealthDocumentRecord", display: "Record artifact" },
  ];

  const [selectedPurpose, setSelectedPurpose] = useState({
    code: "",
    display: "",
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [eraseDate, setEraseDate] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    abhaId: "",
  });

  const [formData, setFormData] = useState({
    bloodPressureHigh: "",
    bloodPressureLow: "",
    oxygenLevel: "",
    pulse: "",
    symptoms: "",
    diagnosis: "",
    prescriptions: [],
  });

  useEffect(() => {
    const initialPrescription = {
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
    };
    setFormData({
      ...formData,
      prescriptions: [initialPrescription],
    });
  }, []);

  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (location.state && location.state.appToken) {
      setAppToken(location.state.appToken);
      setDoctorEmail(location.state.doctorDetails);
    }
  }, [location.state, navigate]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (appToken) {
      fetchPatientHistory(appToken);
      fetchPatientDetails(appToken);
    }
  }, [appToken]);

  const fetchPatientHistory = async (appToken) => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      };
      const response = await axios.get(
        `${API_URL}/doctor/history/${appToken}`,
        { headers: headers }
      );
      setPatientHistory(response.data);
    } catch (error) {
      // toast.error("Error fetching patient history");
    }
  };

  const fetchPatientDetails = async (appToken) => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      };
      const response = await axios.post(
        `${API_URL}/doctor/patientDetailByAppointmentNo`,
        { tokenNo: appToken },
        { headers: headers }
      );
      const dobParts = response.data.dob.split("-");
      const dobYear = parseInt(dobParts[0]);
      const dobMonth = parseInt(dobParts[1]) - 1;
      const dobDay = parseInt(dobParts[2]);
      const dob = new Date(dobYear, dobMonth, dobDay);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      setPatientDetails({
        name: response.data.name,
        age: age,
        abhaId: response.data.abhaId,
      });
    } catch (error) {
      toast.error("Error fetching patient details");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    };

    try {
      if (!appToken) {
        toast.error("Appointment token not found");
        return;
      }

      const response = await axios.post(
        `${API_URL}/doctor/addPatientRecord/${appToken}`,
        formData,
        { headers: headers }
      );

      if (response.status !== 200) {
        toast.error("Failed to submit consultation form");
        throw new Error("Failed to submit consultation form");
      } else {
        toast.success("Consultation form submitted successfully");
      }

      if (checked) {
        const pushCareContextResponse = await axios.post(
          `${API_URL}/doctor/pushCareContext`,
          { abhaId: patientDetails.abhaId },
          { headers: headers }
        );
      }
      setTimeout(() => {
        navigate("/doctor/view-appointments");
      }, 2000);
    } catch (error) {
      toast.error("Error submitting consultation form");
    } finally {
    }
  };

  const handlePrescriptionChange = (index, key, value) => {
    const updatedPrescriptions = [...formData.prescriptions];
    updatedPrescriptions[index][key] = value;
    setFormData({ ...formData, prescriptions: updatedPrescriptions });
  };

  const handleAddPrescription = () => {
    const newPrescription = {
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
    };
    setFormData({
      ...formData,
      prescriptions: [...formData.prescriptions, newPrescription],
    });
  };

  const handlePrescriptionSubmit = () => {
    toast.success("Prescription added successfully");
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handlePurposeChange = (event) => {
    const selectedPurposeCode = event.target.value;
    const selectedPurposeObject = purposes.find(
      (purpose) => purpose.code === selectedPurposeCode
    );
    if (selectedPurposeObject) {
      setSelectedPurpose({
        code: selectedPurposeCode,
        display: selectedPurposeObject.display,
      });
    } else {
      toast.error(`Purpose with code ${selectedPurposeCode} not found`);
    }
  };

  const handleconsentStatus = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    };
    try {
      const formdata = {
        consentRequestId: consentId,
      };
      const response = await axios.post(
        `${API_URL}/doctor/consentRequestStatus`,
        formdata,
        { headers: headers }
      );
      if (response.status === 200) {
        toast.success(`Consent status: ${response.data.consentRequestStatus}`);
      } else {
        toast.error("Failed to check consent status");
      }
    } catch (error) {
      toast.error("Error checking consent status");
    }
  };

  const handleconsentSubmit = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    };

    try {
      if (new Date(fromDate) > new Date(toDate)) {
        toast.error("From date must be less than or equal to To date");
        return;
      }

      const currentDate = new Date();

      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      const eraseDateObj = new Date(eraseDate);

      fromDateObj.setHours(
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      toDateObj.setHours(
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      eraseDateObj.setHours(
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );

      const formattedFromDate = fromDateObj.toISOString();
      const formattedToDate = toDateObj.toISOString();
      const formattedEraseDate = eraseDateObj.toISOString();

      const consentRequestData = {
        purpose: {
          text: selectedPurpose.display,
          code: selectedPurpose.code,
          refUri: "string",
        },
        patientAbhaAddress: patientDetails.abhaId,
        doctorEmail: doctorEmail,
        hiTypes: hiTypes
          .filter((type) => formData[type.code])
          .map((type) => type.code),
        permission: {
          accessMode: "VIEW",
          dateRange: {
            from: formattedFromDate,
            to: formattedToDate,
          },
          dataEraseAt: formattedEraseDate,
          frequency: {
            unit: "MONTH",
            value: 12,
            repeats: 12,
          },
        },
      };
      const response = await axios.post(
        `${API_URL}/doctor/consentRequestInit`,
        consentRequestData,
        { headers: headers }
      );
      setConsentId(response.data.consentRequestId);
      if (response.status === 200) {
        toast.success("Consent request initiated successfully");
      } else {
        toast.error("Failed to initiate consent request");
      }
    } catch (error) {
      toast.error("Error submitting consent request");
    }
  };

  return (
    <div className="main-background-doctor">
      <div className=" text-5xl">PATIENT CONSULTATION FORM</div>
      <div className="flex justify-center items-center mt-20 pt-10 mb-20">
        <div
          className="glass-background cnform"
          style={{ height: "auto", marginBottom: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "2rem",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <div className="flex pl-20 pr-20" style={{ width: "100%" }}>
              <label
                className="fw-bold text-center mb-4"
                style={{ width: "100%" }}
              >
                <div className="flex justify-between" style={{ width: "100%" }}>
                  <div className="font-sans font-thin">
                    Patient Name: {patientDetails.name}
                  </div>
                  <div className="font-sans font-thin">
                    Age: {patientDetails.age}
                  </div>
                </div>
              </label>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex pl-20 pr-20">
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
              <div className="flex gap-5 pl-20  pr-20">
                <div className="d-flex gap-3 w-100">
                  <TextField
                    id="bloodPressureHigh"
                    label="Blood Pressure High"
                    variant="outlined"
                    size="medium"
                    style={{ marginBottom: "1rem", width: "200%" }}
                    value={formData.bloodPressureHigh}
                    onChange={handleChange}
                  />
                  <TextField
                    id="bloodPressureLow"
                    label="Blood Pressure Low"
                    variant="outlined"
                    size="medium"
                    style={{ marginBottom: "1rem", width: "200%" }}
                    value={formData.bloodPressureLow}
                    onChange={handleChange}
                  />
                </div>

                <TextField
                  id="oxygenLevel"
                  label="Oxygen Level"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%", paddingLeft: "2" }}
                  value={formData.oxygenLevel}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-5 pl-20 pr-20">
                <TextField
                  id="pulse"
                  label="Pulse"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.pulse}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleCheck} />
                  }
                  label={
                    <Typography style={{ fontSize: "22px" }}>
                      Push Care Context
                    </Typography>
                  }
                  style={{ marginBottom: "1rem", width: "100%" }}
                />
              </div>
              <div className="flex pl-20 gap-5 pr-20">
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
              <div className="mt-2 flex justify-end pl-20 gap-5 pr-20">
                <Button
                  className="button "
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  onClick={() => {
                    setModalShow1(true);
                  }}
                >
                  {"Add Prescription"}
                </Button>

                <Modal
                  show={modalShow1}
                  onHide={() => setModalShow1(false)}
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
                    {formData.prescriptions.map((prescription, index) => (
                      <div key={index} className="d-flex gap-2">
                        <TextField
                          type="text"
                          label="Medicine"
                          value={prescription.medicine}
                          onChange={(e) =>
                            handlePrescriptionChange(
                              index,
                              "medicine",
                              e.target.value
                            )
                          }
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        />
                        <TextField
                          type="text"
                          label="Dosage"
                          value={prescription.dosage}
                          onChange={(e) =>
                            handlePrescriptionChange(
                              index,
                              "dosage",
                              e.target.value
                            )
                          }
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        />
                        <TextField
                          type="text"
                          label="Frequency"
                          value={prescription.frequency}
                          onChange={(e) =>
                            handlePrescriptionChange(
                              index,
                              "frequency",
                              e.target.value
                            )
                          }
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        />
                        <TextField
                          type="number"
                          label="Duration (in days)"
                          value={prescription.duration}
                          onChange={(e) =>
                            handlePrescriptionChange(
                              index,
                              "duration",
                              e.target.value
                            )
                          }
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        />
                      </div>
                    ))}
                    <div className="d-flex justify-content-between mt-4">
                      <button
                        className="btn btn-success btn-lg"
                        onClick={handleAddPrescription}
                      >
                        Add Another Prescription
                      </button>
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={handlePrescriptionSubmit}
                      >
                        Submit Prescription
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>

                <button
                  type="submit"
                  className="button"
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Submit
                </button>
              </div>{" "}
            </form>

            <div className="mt-2 flex justify-end pl-20 gap-5 pr-20 mb-8">
              <PatientHistoryPopup
                type="button"
                className="button"
                title="Patient History"
                // onClick={() => fetchPatientHistory(appToken)}
                onClose={() => setShowPopup(false)}
                patientHistory={patientHistory}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  padding: "15px 20px",
                }}
              />
              <Button
                className="button "
                style={{
                  marginTop: "2rem",
                  width: "100%",
                  height: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                onClick={() => {
                  setModalShow(true);
                }}
              >
                {"Request Consent"}
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
                    Request Consent
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <TextField
                    value={selectedPurpose.code}
                    label="Purpose"
                    onChange={handlePurposeChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    select
                  >
                    {purposes.map((purpose) => (
                      <MenuItem key={purpose.code} value={purpose.code}>
                        {purpose.display}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    type="text"
                    label="Patient Abha ID"
                    value={patientDetails.abhaId}
                    onChange={(e) => setDosage(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <Typography variant="subtitle1">
                    Health Information Types
                  </Typography>
                  {hiTypes.map((type) => (
                    <FormControlLabel
                      key={type.code}
                      control={
                        <Checkbox
                          checked={formData[type.code] || false}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [type.code]: e.target.checked,
                            })
                          }
                        />
                      }
                      label={type.display}
                    />
                  ))}
                  <TextField
                    type="date"
                    label="From"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: getCurrentDate(),
                      min: "1900-01-01",
                    }}
                  />
                  <TextField
                    type="date"
                    label="To"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: getCurrentDate(),
                      min: "1900-01-01",
                    }}
                  />
                  <TextField
                    type="date"
                    label="Data Erase At"
                    value={eraseDate}
                    onChange={(e) => setEraseDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: "2030-01-01",
                      min: getCurrentDate(),
                    }}
                  />
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="btn btn-warning btn-lg"
                      onClick={handleconsentStatus}
                    >
                      Check Consent Status
                    </button>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleconsentSubmit}
                    >
                      Request Consent
                    </button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNForm;