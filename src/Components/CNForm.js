// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';

// const CNForm = ({ patientId, doctorId }) => {
//   const [formData, setFormData] = useState({
//     symptoms: '', // Default symptoms
//     bloodPressure: '', // Default blood pressure
//     oxygenLevel: '', // Default oxygen level
//     pulse: '', // Default pulse
//     medicine: [], // Default medicine
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(`localhost:9191/staff/${patientId}/${doctorId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit consultation form');
//       }

//       // Handle success
//       console.log('Consultation form submitted successfully');
//     } catch (error) {
//       console.error('Error submitting consultation form:', error.message);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <div className='flex'>
//         <div>------------------------</div>
//         <h2>PATIENT CONSULTATION FORM</h2>
//         <div>------------------------</div>
//       </div>
//       <form style={{ width: '50%', marginTop: '2rem' }} onSubmit={handleSubmit}>
//         <TextField
//           id="symptoms"
//           label="Symptoms"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.symptoms}
//           onChange={handleChange}
//         />
//         <TextField
//           id="bloodPressure"
//           label="Blood Pressure"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.bloodPressure}
//           onChange={handleChange}
//         />
//         <TextField
//           id="oxygenLevel"
//           label="Oxygen Level"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.oxygenLevel}
//           onChange={handleChange}
//         />
//         <TextField
//           id="pulse"
//           label="Pulse"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.pulse}
//           onChange={handleChange}
//         />
//         <TextField
//           id="medicine"
//           label="Medicine"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.medicine}
//           onChange={handleChange}
//         />
//         <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CNForm;




// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';
// import { useLocation } from "react-router-dom";



// const CNForm = ({ patientId, doctorId }) => {

//   const location = useLocation();

//   const appointToken = location.state.appToken;

//   const [formData, setFormData] = useState({
//     symptoms: '', // Default symptoms
//     bloodPressure: '', // Default blood pressure
//     oxygenLevel: '', // Default oxygen level
//     pulse: '', // Default pulse
//     medicine: [], // Default medicine
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     const response = await fetch(`localhost:9191/staff/${patientId}/${doctorId}`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Failed to submit consultation form');
//   //     }

//   //     // Handle success
//   //     console.log('Consultation form submitted successfully');
//   //   } catch (error) {
//   //     console.error('Error submitting consultation form:', error.message);
//   //   }
//   // };



//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(`http://localhost:9191/doctor/addPatientRecord/${appointToken}`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status !== 200) {
//         throw new Error('Failed to submit consultation form');
//       }

//       // Handle success
//       console.log('Consultation form submitted successfully');
//     } catch (error) {
//       console.error('Error submitting consultation form:', error.message);
//     }
//   };

//   const handleViewPatientHistory = () => {
//     // Logic to view patient history
//   };

//   const handleRequestConsent = () => {
//     // Logic to request consent
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <div className='flex'>
//         <div>------------------------</div>
//         <h2>PATIENT CONSULTATION FORM</h2>
//         <div>------------------------</div>
//       </div>
//       <form style={{ width: '50%', marginTop: '2rem' }} onSubmit={handleSubmit}>
//         <TextField
//           id="symptoms"
//           label="Symptoms"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.symptoms}
//           onChange={handleChange}
//         />
//         <TextField
//           id="bloodPressure"
//           label="Blood Pressure"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.bloodPressure}
//           onChange={handleChange}
//         />
//         <TextField
//           id="oxygenLevel"
//           label="Oxygen Level"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.oxygenLevel}
//           onChange={handleChange}
//         />
//         <TextField
//           id="pulse"
//           label="Pulse"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.pulse}
//           onChange={handleChange}
//         />
//         <TextField
//           id="medicine"
//           label="Medicine"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '1rem', width: '100%' }}
//           value={formData.medicine}
//           onChange={handleChange}
//         />
//         {/* Other form fields */}
//         <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
//       </form>
//       <div style={{ marginTop: '1rem' }}>
//         <button onClick={handleViewPatientHistory} className="btn btn-secondary me-2">View Patient History</button>
//         <button onClick={handleRequestConsent} className="btn btn-secondary me-2">Request Consent</button>
//       </div>
//     </div>
//   );
// };

// export default CNForm;





















import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { PatientHistoryPopup } from './PatientHistoryPopup';
// import TextField from "@mui/material/TextField";
import doctorImage from '../assets/DoctorPage.png';


const CNForm = ({ patientId, doctorId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appToken, setAppToken] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // const appointToken = location.state?.appToken || null; // Check if appToken exists in the location state
  console.log("Apptoken: ", appToken);

  const [formData, setFormData] = useState({
    symptoms: '', // Default symptoms
    bloodPressure: '', // Default blood pressure
    oxygenLevel: '', // Default oxygen level
    pulse: '', // Default pulse
    medicine: [], // Default medicine
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
      // Handle the case where doctor details are not available
      // navigate('/error'); // Redirect to error page or handle accordingly
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
      const response = await axios.get(`http://localhost:9191/doctor/history/${appToken}`,
        { headers: headers });
      console.log(response);
      setPatientHistory(response.data);
    } catch (error) {
      console.error('Error fetching patient history:', error.message);
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
      medicine: [...formData.medicine, ''],
    });
  };

  // Function to remove a medicine entry
  const removeMedicine = (index) => {
    const updatedMedicine = [...formData.medicine];
    updatedMedicine.splice(index, 1);
    setFormData({ ...formData, medicine: updatedMedicine });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!appToken) {
        // Handle the case when appToken is not available
        console.error('Appointment token not found');
        return;
      }
      console.log("formdata: ", formData);
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // const formData = { email: email };
      // const response = await axios.post(
      //   `http://localhost:9191/admin/deActivateStaff`,
      //   formData,
      //   { headers: headers }
      // );
      const response = await axios.post(`http://localhost:9191/doctor/addPatientRecord/${appToken}`,
        formData,
        { headers: headers }
      );

      if (response.status !== 200) {
        throw new Error('Failed to submit consultation form');
      }
      else {
        console.log("response: ", response);
      }

      // Handle success
      console.log('Consultation form submitted successfully');
    } catch (error) {
      console.error('Error submitting consultation form:', error.message);
    }
  };

  const handleViewPatientHistory = () => {
    // Logic to view patient history
    setShowPopup(true);
  };

  const handleRequestConsent = () => {
    // Logic to request consent
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">

     
        <div className="flex justify-center items-center">
          <div className="image-container">
            <img src={doctorImage} className="admin-image" />
            <div className="dashboard-name-doctor" style={{ fontSize: "xx-large" }}>
            CONSULTATION FORM
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20 pt-10">
  <div className="container glass-background login-cred">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
        height: "80vh", // Set height to 80% of viewport height
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <div className="flex">
        <label className="text-login fw-bold text-center ">
          Consultation Form
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="symptoms"
            label="Symptoms"
            variant="outlined"
            size="small"
            style={{ marginBottom: '1rem', width: '100%' }}
            value={formData.symptoms}
            onChange={handleChange}
          />
        </div>
         <div>
 {/* <label htmlFor="newMobileNo">New Mobile No:</label> */}
 <TextField
  id="bloodPressure"
label="Blood Pressure"
variant="outlined"
size="small"
style={{ marginBottom: '1rem', width: '100%' }}
value={formData.bloodPressure}
onChange={handleChange}
/>
</div>
<div>
<TextField
id="oxygenLevel"
label="Oxygen Level"
variant="outlined"
size="small"
style={{ marginBottom: '1rem', width: '100%' }}
value={formData.oxygenLevel}
onChange={handleChange}
/>
</div>
<div>
<TextField
id="pulse"
label="Pulse"
variant="outlined"
size="small"
style={{ marginBottom: '1rem', width: '100%' }}
value={formData.pulse}
onChange={handleChange}
/>
 </div>

        <div>
          {formData.medicine.map((medicineName, index) => (
            <div key={index}>
              <TextField
                type="text"
                value={medicineName}
                onChange={(e) => handleMedicineChange(index, e.target.value)}
                placeholder="Medicine Name"
              />
              <button type="button" className="button" onClick={() => removeMedicine(index)}>Remove</button>
            </div>
          ))}
        </div>
        <button
          onClick={addMedicine}
          type="button"
          className="button"
          style={{ marginTop: '2rem', width: "100%" }}
        >
          Add Medicine
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <button
          type="button"
          className="button"
          style={{ marginTop: '2rem', width: "100%" }}
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







// <div className="flex justify-center items-center mt-20 pt-10">
// <div className="container glass-background login-cred">
  
// <div
// style={{
// display: "flex",
// flexDirection: "column",
// alignItems: "center",
// paddingTop: "2rem",
// }}
// >
// <div className="flex">
// <label className="text-login fw-bold text-center ">
// Consultation Form
// </label>
// </div>
// <form onSubmit={handleSubmit}>
// <div>
// {/* <label htmlFor="email">Email:</label> */}
// <TextField
//   id="symptoms"
// label="Symptoms"
// variant="outlined"
// size="small"
// style={{ marginBottom: '1rem', width: '100%' }}
// value={formData.symptoms}
// onChange={handleChange}
// />
// </div>
// <div>
// {/* <label htmlFor="newMobileNo">New Mobile No:</label> */}
// <TextField
//   id="bloodPressure"
// label="Blood Pressure"
// variant="outlined"
// size="small"
// style={{ marginBottom: '1rem', width: '100%' }}
// value={formData.bloodPressure}
// onChange={handleChange}
// />
// </div>
// <div>
// <TextField
// id="oxygenLevel"
// label="Oxygen Level"
// variant="outlined"
// size="small"
// style={{ marginBottom: '1rem', width: '100%' }}
// value={formData.oxygenLevel}
// onChange={handleChange}
// />
// </div>
// <div>
// <TextField
// id="pulse"
// label="Pulse"
// variant="outlined"
// size="small"
// style={{ marginBottom: '1rem', width: '100%' }}
// value={formData.pulse}
// onChange={handleChange}
// />
// </div>

// {/* <h2>Medicine</h2> */}
// {formData.medicine.map((medicineName, index) => (
// <div key={index}>
// <TextField
// type="text"
// value={medicineName}
// onChange={(e) => handleMedicineChange(index, e.target.value)}
// placeholder="Medicine Name"
// />
// <button type="button" className="btn btn-danger me-2" onClick={() => removeMedicine(index)}>Remove</button>
// </div>
// ))}


// {/* Display success message if doctor details update is successful */}
// <button
// onClick={addMedicine}
// type="submit"
// className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//     style={{marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
// >
// Add Medicine
// </button>
// </form>
// <div style={{ marginTop: '1rem' }}>
// {/* <button className="btn btn-primary me-2" onClick={handleViewPatientHistory}>View Patient History</button> */}
// <button type="submit"
// className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//     style={{marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
// onClick={handleRequestConsent}>Request Consent</button>
// </div>
// {
// <PatientHistoryPopup
// title="Patient History"
// onClose={() => setShowPopup(false)}
// patientHistory={patientHistory} // Pass patient history data to the Popup component
// />
// }
// </div>
// </div>
// </div>
























































// <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// <div className='flex'>
//   <div>------------------------</div>
//   <h2>PATIENT CONSULTATION FORM</h2>
//   <div>------------------------</div>
// </div>
// <form style={{ width: '50%', marginTop: '2rem' }} onSubmit={handleSubmit}>
//   <form>
//     <TextField
//       id="symptoms"
//       label="Symptoms"
//       variant="outlined"
//       size="small"
//       style={{ marginBottom: '1rem', width: '100%' }}
//       value={formData.symptoms}
//       onChange={handleChange}
//     />
//     <TextField
//       id="bloodPressure"
//       label="Blood Pressure"
//       variant="outlined"
//       size="small"
//       style={{ marginBottom: '1rem', width: '100%' }}
//       value={formData.bloodPressure}
//       onChange={handleChange}
//     />
//     <TextField
//       id="oxygenLevel"
//       label="Oxygen Level"
//       variant="outlined"
//       size="small"
//       style={{ marginBottom: '1rem', width: '100%' }}
//       value={formData.oxygenLevel}
//       onChange={handleChange}
//     />
//     <TextField
//       id="pulse"
//       label="Pulse"
//       variant="outlined"
//       size="small"
//       style={{ marginBottom: '1rem', width: '100%' }}
//       value={formData.pulse}
//       onChange={handleChange}
//     />
//     <h2>Medicine</h2>
//     {formData.medicine.map((medicineName, index) => (
//       <div key={index}>
//         <input
//           type="text"
//           value={medicineName}
//           onChange={(e) => handleMedicineChange(index, e.target.value)}
//           placeholder="Medicine Name"
//         />
//         <button type="button" onClick={() => removeMedicine(index)}>Remove</button>
//       </div>
//     ))}
//     <button type="button" onClick={addMedicine}>Add Medicine</button>
//     {/* <button type="submit">Submit</button> */}
//   </form>
//   <button className="btn btn-success me-2" type="submit">Submit</button>
// </form>
// <div style={{ marginTop: '1rem' }}>
//   {/* <button className="btn btn-primary me-2" onClick={handleViewPatientHistory}>View Patient History</button> */}
//   <button className="btn btn-primary me-2" onClick={handleRequestConsent}>Request Consent</button>
// </div>
// {
//   <PatientHistoryPopup
//     title="Patient History"
//     onClose={() => setShowPopup(false)}
//     patientHistory={patientHistory} // Pass patient history data to the Popup component
//   />
// }
// </div>


























// {error && <p style={{ color: "red" }}></p>}{" "}
//         {/* Display error message if present */}
//         {success && (
//           <p style={{ color: "green" }}>
//             Receptionist details updated successfully!
//           </p>
//         )}{" "}