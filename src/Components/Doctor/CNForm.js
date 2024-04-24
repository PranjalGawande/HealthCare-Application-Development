// import React, { useEffect, useState } from "react";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PatientHistoryPopup } from "./PatientHistoryPopup";
// import doctorImage from "../../assets/DoctorPage.png";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import toast from "react-hot-toast";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Typography from "@mui/material/Typography";

// const CNForm = ({ patientId, doctorId }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [appToken, setAppToken] = useState(null);
//   const [patientHistory, setPatientHistory] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [modalShow, setModalShow] = React.useState(false);
//   const [medicine, setMedicine] = useState("");
//   const [dosage, setDosage] = useState("");
//   const [frequency, setFrequency] = useState("");
//   const [duration, setDuration] = useState("");

//   // console.log("Apptoken: ", appToken);

//   const [formData, setFormData] = useState({
//     symptoms: "",
//     bloodPressure: "",
//     oxygenLevel: "",
//     pulse: "",
//     diagnosis: "",
//     weight: "",
//     prescriptions: [],
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//     // console.log("formdata: ", formData);
//     // console.log("appToken: ", appToken);
//   };

//   useEffect(() => {
//     if (location.state && location.state.appToken) {
//       setAppToken(location.state.appToken);
//     } else {
//       // console.log("No token found");
//     }
//   }, [location.state, navigate]);

//   useEffect(() => {
//     if (appToken) {
//       fetchPatientHistory(appToken);
//     }
//   }, [appToken]);

//   const fetchPatientHistory = async (appToken) => {
//     try {
//       const token = localStorage.getItem("token");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };
//       const response = await axios.get(
//         `http://localhost:9191/doctor/history/${appToken}`,
//         { headers: headers }
//       );
//       // console.log(response);
//       setPatientHistory(response.data);
//     } catch (error) {
//       // console.error("Error fetching patient history:", error.message);
//     }
//   };

//   const handleMedicineChange = (index, field, value) => {
//     const updatedMedicine = [...formData.medicine];
//     updatedMedicine[index] = value;
//     setFormData({ ...formData, medicine: updatedMedicine });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (!appToken) {
//         toast.error("Appointment token not found");
//         // console.error("Appointment token not found");
//         return;
//       }
//       // console.log("formdata: ", formData);
//       const token = localStorage.getItem("token");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.post(
//         `http://localhost:9191/doctor/addPatientRecord/${appToken}`,
//         formData,
//         { headers: headers }
//       );

//       if (response.status !== 200) {
//         toast.error("Failed to submit consultation form");
//         throw new Error("Failed to submit consultation form");
//       } else {
//         toast.success("Consultation form submitted successfully");
//         setTimeout(() => {
//           navigate("/doctor/view-appointments");
//         }, 2000);
//         // console.log("response: ", response);
//       }

//       // console.log("Consultation form submitted successfully");
//     } catch (error) {
//       toast.error("Error submitting consultation form");
//       // console.error("Error submitting consultation form:", error.message);
//     }
//   };

//   const handleViewPatientHistory = () => {
//     setShowPopup(true);
//   };

//   // const handleRequestConsent = () => {
//   // };
//   const handleprescriptionSubmit = () => {
//     const prescriptions = {
//       medicine,
//       dosage,
//       frequency,
//       duration: parseInt(duration),
//     };

//     // console.log("Prescriptions:", prescriptions);
//     setFormData({
//       ...formData,
//       prescriptions: [...formData.prescriptions, prescriptions],
//     });

//     toast.success("Prescription added successfully");
//   };

//   const [checked, setChecked] = useState(false);

//   const handleCheck = (event) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     // <div className="">
//     //   <div className="background-appointment flex flex-wrap justify-center items-center">
//     //     <div className="flex justify-center items-center">
//     //       <div className="image-container md:block hidden pl-2">
//     //         <img src={doctorImage} className="admin-image" alt="doctorImage" />
//     //         <div
//     //           className="dashboard-name-doctor"
//     //           style={{ fontSize: "40px" }}
//     //         >
//     //           CONSULTATION FORM
//     //         </div>
//     //       </div>
//     //     </div>
//     //     <div className="flex justify-center items-center mt-20 pt-10">
//     //       <div className="container glass-background login-cred" style={{ height: "auto", marginBottom: "2rem" }}>
//     //         <div
//     //           style={{
//     //             display: "flex",
//     //             flexDirection: "column",
//     //             alignItems: "center",
//     //             paddingTop: "2rem",
//     //             width: "100%",
//     //             overflowY: "auto",
//     //           }}
//     //         >
//     //           <div className="flex">
//     //             <label className="fw-bold text-center mb-4">
//     //               Consultation Form
//     //             </label>
//     //           </div>
//     //           <form onSubmit={handleSubmit}>
//     //             <div>
//     //               <TextField
//     //                 id="symptoms"
//     //                 label="Symptoms"
//     //                 variant="outlined"
//     //                 size="medium"
//     //                 style={{ marginBottom: "1rem", width: "100%" }}
//     //                 value={formData.symptoms}
//     //                 onChange={handleChange}
//     //               />
//     //             </div>
//     //             <div>
//     //               <TextField
//     //                 id="bloodPressure"
//     //                 label="Blood Pressure"
//     //                 variant="outlined"
//     //                 size="medium"
//     //                 style={{ marginBottom: "1rem", width: "100%" }}
//     //                 value={formData.bloodPressure}
//     //                 onChange={handleChange}
//     //               />
//     //             </div>
//     //             <div>
//     //               <TextField
//     //                 id="oxygenLevel"
//     //                 label="Oxygen Level"
//     //                 variant="outlined"
//     //                 size="medium"
//     //                 style={{ marginBottom: "1rem", width: "100%" }}
//     //                 value={formData.oxygenLevel}
//     //                 onChange={handleChange}
//     //               />
//     //             </div>
//     //             <div>
//     //               <TextField
//     //                 id="pulse"
//     //                 label="Pulse"
//     //                 variant="outlined"
//     //                 size="medium"
//     //                 style={{ marginBottom: "1rem", width: "100%" }}
//     //                 value={formData.pulse}
//     //                 onChange={handleChange}
//     //               />
//     //             </div>
//     //             <div>
//     //               <TextField
//     //                 id="diagnosis"
//     //                 label="Diagnosis"
//     //                 variant="outlined"
//     //                 size="medium"
//     //                 style={{ marginBottom: "1rem", width: "100%" }}
//     //                 value={formData.diagnosis}
//     //                 onChange={handleChange}
//     //               />
//     //             </div>

//     //             <Button
//     //               className="button "
//     //               style={{
//     //                 marginTop: "2rem",
//     //                 width: "100%",
//     //                 height: "10%",
//     //                 display: "flex",
//     //                 justifyContent: "center",
//     //                 alignItems: "center",
//     //                 paddingTop: "10px", paddingBottom: "10px"
//     //               }}
//     //               onClick={() => {
//     //                 setModalShow(true);
//     //               }}
//     //             >
//     //               {"Add Prescription"}
//     //             </Button>

//     //             <Modal
//     //               show={modalShow}
//     //               onHide={() => setModalShow(false)}
//     //               size="lg"
//     //               aria-labelledby="contained-modal-title-vcenter"
//     //               centered
//     //             >
//     //               <Modal.Header closeButton>
//     //                 <Modal.Title id="contained-modal-title-vcenter">
//     //                   Add Prescription
//     //                 </Modal.Title>
//     //               </Modal.Header>
//     //               <Modal.Body>
//     //                 <TextField
//     //                   type="text"
//     //                   label="Medicine"
//     //                   value={medicine}
//     //                   onChange={(e) => setMedicine(e.target.value)}
//     //                   fullWidth
//     //                   margin="normal"
//     //                   variant="outlined"
//     //                 />
//     //                 <TextField
//     //                   type="text"
//     //                   label="Dosage"
//     //                   value={dosage}
//     //                   onChange={(e) => setDosage(e.target.value)}
//     //                   fullWidth
//     //                   margin="normal"
//     //                   variant="outlined"
//     //                 />
//     //                 <TextField
//     //                   type="text"
//     //                   label="Frequency"
//     //                   value={frequency}
//     //                   onChange={(e) => setFrequency(e.target.value)}
//     //                   fullWidth
//     //                   margin="normal"
//     //                   variant="outlined"
//     //                 />
//     //                 <TextField
//     //                   type="number"
//     //                   label="Duration (in days)"
//     //                   value={duration}
//     //                   onChange={(e) => setDuration(e.target.value)}
//     //                   fullWidth
//     //                   margin="normal"
//     //                   variant="outlined"
//     //                 />
//     //                 <button className="btn btn-primary" onClick={handleprescriptionSubmit}>
//     //                   Add Prescription
//     //                 </button>
//     //               </Modal.Body>

//     //             </Modal>

//     //             <div style={{ marginTop: "1rem" }}>
//     //               <button
//     //                 type="submit"
//     //                 className="button"
//     //                 style={{ marginTop: "2rem", width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
//     //               // onClick={handleRequestConsent}
//     //               >
//     //                 Submit
//     //               </button>
//     //             </div>
//     //           </form>

//     //           <div>
//     //             {
//     //               <PatientHistoryPopup
//     //                 type="button"
//     //                 className="button"
//     //                 title="Patient History"
//     //                 onClose={() => setShowPopup(false)}
//     //                 patientHistory={patientHistory}
//     //                 style={{ marginTop: "2rem", width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
//     //               />
//     //             }
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>

//     <div>
//       <div className="mt-5 text-5xl">PATIENT CONSULTATION FORM</div>
//       <div className="flex justify-center items-center mt-20 pt-10">
//         <div
//           className="glass-background cnform"
//           style={{ height: "auto", marginBottom: "2rem" }}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               paddingTop: "2rem",
//               width: "100%",
//               overflowY: "auto",
//             }}
//           >
//             <div className="flex pl-20 pr-20" style={{ width: "100%" }}>
//               <label
//                 className="fw-bold text-center mb-4"
//                 style={{ width: "100%" }}
//               >
//                 <div className="flex justify-between" style={{ width: "100%" }}>
//                   <div>Patient Name:</div>
//                   <div>Age:</div>
//                 </div>
//               </label>
//             </div>

//             <form onSubmit={handleSubmit}>
// <div className="flex pl-20 pr-20">
//   <TextField
//     id="symptoms"
//     label="Symptoms"
//     variant="outlined"
//     size="medium"
//     style={{ marginBottom: "1rem", width: "100%" }}
//     value={formData.symptoms}
//     onChange={handleChange}
//   />
// </div>
// <div className="flex gap-5 pl-20  pr-20">
//   <TextField
//     id="bloodPressure"
//     label="Blood Pressure"
//     variant="outlined"
//     size="medium"
//     style={{ marginBottom: "1rem", width: "100%" }}
//     value={formData.bloodPressure}
//     onChange={handleChange}
//   />
//   <TextField
//     id="oxygenLevel"
//     label="Oxygen Level"
//     variant="outlined"
//     size="medium"
//     style={{ marginBottom: "1rem", width: "100%" }}
//     value={formData.oxygenLevel}
//     onChange={handleChange}
//   />
// </div>
// <div className="flex gap-5 pl-20 pr-20">
//   <TextField
//     id="pulse"
//     label="Pulse"
//     variant="outlined"
//     size="medium"
//     style={{ marginBottom: "1rem", width: "100%" }}
//     value={formData.pulse}
//     onChange={handleChange}
//   />
//   <TextField
//     id="weight"
//     label="Weight"
//     variant="outlined"
//     size="medium"
//     style={{ marginBottom: "1rem", width: "100%" }}
//     value={formData.weight}
//     onChange={handleChange}
//   />
// </div>

// <div className="flex pl-20 gap-5 pr-20">
//   <TextField
//     id="diagnosis"
//     label="Diagnosis"
//     variant="outlined"
//     size="medium"
//     style={{ marginBottom: "1rem", width: "100%" }}
//     value={formData.diagnosis}
//     onChange={handleChange}
//   />
//   <FormControlLabel
//     control={
//       <Checkbox checked={checked} onChange={handleCheck} />
//     }
//     label={
//       <Typography style={{ fontSize: "22px" }}>
//         Push Care Context
//       </Typography>
//     }
//     style={{ marginBottom: "1rem", width: "100%" }}
//   />
// </div>

// <div className="mt-2 flex justify-end pl-20 gap-5 pr-20">
//   <Button
//     className="button "
//     style={{
//       marginTop: "2rem",
//       width: "100%",
//       height: "10%",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       paddingTop: "20px",
//       paddingBottom: "20px",
//     }}
//     onClick={() => {
//       setModalShow(true);
//     }}
//   >
//     {"Add Prescription"}
//   </Button>

//   <Modal
//     show={modalShow}
//     onHide={() => setModalShow(false)}
//     size="lg"
//     aria-labelledby="contained-modal-title-vcenter"
//     centered
//   >
//     <Modal.Header closeButton>
//       <Modal.Title id="contained-modal-title-vcenter">
//         Add Prescription
//       </Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <TextField
//         type="text"
//         label="Medicine"
//         value={medicine}
//         onChange={(e) => setMedicine(e.target.value)}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         type="text"
//         label="Dosage"
//         value={dosage}
//         onChange={(e) => setDosage(e.target.value)}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         type="text"
//         label="Frequency"
//         value={frequency}
//         onChange={(e) => setFrequency(e.target.value)}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         type="number"
//         label="Duration (in days)"
//         value={duration}
//         onChange={(e) => setDuration(e.target.value)}
//         fullWidth
//         margin="normal"
//         variant="outlined"
//       />
//       <button
//         className="btn btn-primary"
//         onClick={handleprescriptionSubmit}
//       >
//         Add Prescription
//       </button>
//     </Modal.Body>
//   </Modal>

//   <button
//     type="submit"
//     className="button"
//     style={{
//       marginTop: "2rem",
//       width: "100%",
//       paddingTop: "20px",
//       paddingBottom: "20px",
//     }}
//     // onClick={handleRequestConsent}
//   >
//     Submit
//   </button>
// </div>
//             </form>

//             <div className="mt-2 flex justify-end pl-20 gap-5 pr-20 mb-8">
//               <PatientHistoryPopup
//                 type="button"
//                 className="button"
//                 title="Patient History"
//                 onClose={() => setShowPopup(false)}
//                 patientHistory={patientHistory}
//                 style={{
//                   marginTop: "1rem",
//                   width: "100%",
//                   paddingTop: "30px",
//                   paddingBottom: "30px",
//                 }}
//               />
//               <PatientHistoryPopup
//                 type="button"
//                 className="button"
//                 title="Request Consent"
//                 onClose={() => setShowPopup(false)}
//                 patientHistory={patientHistory}
//                 style={{
//                   marginTop: "1rem",
//                   width: "100%",
//                   paddingTop: "30px",
//                   paddingBottom: "30px",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CNForm;

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
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
  });

  const [formData, setFormData] = useState({
    
    bloodPressure: "",
    oxygenLevel: "",
    pulse: "",
    symptoms: "",
    diagnosis: "",
    // weight: "",
    prescriptions: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (location.state && location.state.appToken) {
      setAppToken(location.state.appToken);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (appToken) {
      fetchPatientHistory(appToken);
      fetchPatientDetails(appToken);
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
      setPatientHistory(response.data);
    } catch (error) {
      console.error("Error fetching patient history:", error.message);
    }
  };

  const fetchPatientDetails = async (appToken) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `http://localhost:9191/doctor/patientDetailByAppointmentNo`,
        { tokenNo: appToken },
        { headers: headers }
      );
      // Extract year, month, and day from the date of birth
      const dobParts = response.data.dob.split("-");
      const dobYear = parseInt(dobParts[0]);
      const dobMonth = parseInt(dobParts[1]) - 1; // Months are zero-based (0-11)
      const dobDay = parseInt(dobParts[2]);
      // Create a Date object for the date of birth
      const dob = new Date(dobYear, dobMonth, dobDay);
      // Calculate the age
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--; // Subtract 1 if birthday hasn't occurred yet this year
      }
      // Set patient details with name and calculated age
      console.log(response.data);
      setPatientDetails({
        name: response.data.name,
        age: age,
        abhaId: response.data.abhaId,
      });
    } catch (error) {
      console.error("Error fetching patient details:", error.message);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!appToken) {
        toast.error("Appointment token not found");
        return;
      }
  
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log("abha id:", patientDetails.abhaId);
      console.log("Form data:", formData);
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
  
        // If the checkbox is checked, hit the pushCareContext API
        if (checked) {
          const pushCareContextResponse = await axios.post(
            "http://localhost:9191/doctor/pushCareContext",
            { abhaId: patientDetails.abhaId },
            { headers: headers }
          );
          console.log("abha id:", patientDetails.abhaId);
          // Handle success response if needed
          console.log("Push Care Context API response:", pushCareContextResponse.data);
        }
  
        setTimeout(() => {
          navigate("/doctor/view-appointments");
        }, 2000);
      }
    } catch (error) {
      toast.error("Error submitting consultation form due to care context failure!!");
    }
  };
  


  const handleprescriptionSubmit = () => {
    const prescriptions = {
      medicine,
      dosage,
      frequency,
      duration: parseInt(duration),
    };

    setFormData({
      ...formData,
      prescriptions: [...formData.prescriptions, prescriptions],
    });

    toast.success("Prescription added successfully");
  };

  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <div className="mt-5 text-5xl">PATIENT CONSULTATION FORM</div>
      <div className="flex justify-center items-center mt-20 pt-10">
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
                  <div className="font-sans font-thin">Patient Name: {patientDetails.name}</div>
                  <div className="font-sans font-thin">Age: {patientDetails.age}</div>
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
                <TextField
                  id="bloodPressure"
                  label="Blood Pressure"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.bloodPressure}
                  onChange={handleChange}
                />
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
                {/* <TextField
                  id="weight"
                  label="Weight"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.weight}
                  onChange={handleChange}
                /> */}
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
                    paddingTop: "20px",
                    paddingBottom: "20px",
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
                    <button
                      className="btn btn-primary"
                      onClick={handleprescriptionSubmit}
                    >
                      Add Prescription
                    </button>
                  </Modal.Body>
                </Modal>

                <button
                  type="submit"
                  className="button"
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                  // onClick={handleRequestConsent}
                >
                  Submit
                </button>
              </div>{" "}
            </form>

            <div className="mt-2 flex justify-end pl-20 gap-5 pr-20 mb-8">
              {/* <PatientHistoryPopup
                type="button"
                className="button"
                title="Patient History"
                onClose={() => setShowPopup(false)}
                patientHistory={patientHistory}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              /> */}
              <PatientHistoryPopup
  type="button"
  className="button"
  title="Patient History"
  onClose={() => setShowPopup(false)}
  patientHistory={patientHistory}
  style={{
    marginTop: "1rem",
    width: "100%",
    paddingTop: "30px",
    paddingBottom: "30px",
    // Increase padding to make the button thicker
    padding: "15px 20px", // Adjust the values as needed
  }}
/>

              <PatientHistoryPopup
                type="button"
                className="button"
                title="Request Consent"
                onClose={() => setShowPopup(false)}
                patientHistory={patientHistory}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNForm;
