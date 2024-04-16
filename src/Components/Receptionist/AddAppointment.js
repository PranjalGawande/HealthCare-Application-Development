import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";

export const AddAppointment = () => {
  // const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [abhaId, setAbhaId] = useState("");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null); // Store selected doctor's details

  // useEffect(() => {
  // Fetch doctors list from API
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:9191/receptionist/doctorList",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response:", response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // fetchDoctors();
  // }, []);
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctorDetails(doctor); // Set selected doctor's details
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      }); // Get current time in 'HH:MM:SS' format
      const appointmentData = {
        date: currentDate,
        time: currentTime,
        reasonForVisit: reason,
        status: "pending",
        abhaId: abhaId,
        doctorId: selectedDoctor,
      };
      console.log("Appointment Data:", appointmentData);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://localhost:9191/receptionist/addAppointment",
        appointmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response:", response.data);
      toast.success("Appointment Added Successfully");
      setTimeout(() => {
        navigate("/receptionist");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error in Adding Appointment");
    }
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt="patientImage" />
          <div className="dashboard-name-patient">ADD APPOINTMENT</div>
        </div>
        <div className="container glass-background pt-5">
          <label
            className="text-login fw-bold text-center"
            style={{ marginTop: "-70px", marginBottom: "-20px" }}
          >
            Appointment Details
          </label>
          <TextField
            id="abhaId"
            label="Abha Address"
            value={abhaId}
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={(e) => setAbhaId(e.target.value)}
            required
          />
          <TextField
            id="reason"
            label="Reason For Visit"
            value={reason}
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          {selectedDoctorDetails && ( // Render selected doctor's details if available
            <div style={{ fontSize: "25px" }}>
              <span>Selected Doctor: {selectedDoctorDetails.name}</span>
              <p>Specialty: {selectedDoctorDetails.speciality}</p>
              {/* Add more details as needed */}
            </div>
          )}

          <Button
            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            style={{
              marginTop: "2rem",
              width: "80%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              setModalShow(true);
              fetchDoctors();
            }}
          >
            {selectedDoctorDetails ? "Change Doctor" : "Select Doctor"}
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
                Select Doctor
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table">
                <thead>
                  <tr>
                    <th>Doctor ID</th>
                    <th>Doctor Name</th>
                    <th>Specialty</th>
                    <th className="d-flex justify-content-center">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>{doctor.doctorId}</td>
                      <td>{doctor.name}</td>
                      <td>{doctor.speciality}</td>
                      <td className="d-flex justify-content-center">
                        <Button
                          onClick={() => {
                            setSelectedDoctor(doctor.doctorId);
                            handleDoctorSelect(doctor);
                            setModalShow(false);
                          }}
                          disabled={doctor.tokenNo >= doctor.tokenMax + 1}
                        >
                          {doctor.tokenNo >= doctor.tokenMax + 1
                            ? "Fully Booked"
                            : "Select Doctor"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>

          <button
            type="submit"
            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            style={{
              marginTop: "2rem",
              width: "80%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleSubmit}
          >
            Add Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
