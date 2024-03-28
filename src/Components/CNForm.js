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

const CNForm = ({ patientId, doctorId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appToken, setAppToken] = useState(null);

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
  };

  const handleRequestConsent = () => {
    // Logic to request consent
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='flex'>
        <div>------------------------</div>
        <h2>PATIENT CONSULTATION FORM</h2>
        <div>------------------------</div>
      </div>
      <form style={{ width: '50%', marginTop: '2rem' }} onSubmit={handleSubmit}>
        <form>
          <TextField
            id="symptoms"
            label="Symptoms"
            variant="outlined"
            size="small"
            style={{ marginBottom: '1rem', width: '100%' }}
            value={formData.symptoms}
            onChange={handleChange}
          />
          <TextField
            id="bloodPressure"
            label="Blood Pressure"
            variant="outlined"
            size="small"
            style={{ marginBottom: '1rem', width: '100%' }}
            value={formData.bloodPressure}
            onChange={handleChange}
          />
          <TextField
            id="oxygenLevel"
            label="Oxygen Level"
            variant="outlined"
            size="small"
            style={{ marginBottom: '1rem', width: '100%' }}
            value={formData.oxygenLevel}
            onChange={handleChange}
          />
          <TextField
            id="pulse"
            label="Pulse"
            variant="outlined"
            size="small"
            style={{ marginBottom: '1rem', width: '100%' }}
            value={formData.pulse}
            onChange={handleChange}
          />
          {/* <TextField
            id="medicine"
            label="Medicine"
            variant="outlined"
            size="small"
            style={{ marginBottom: '1rem', width: '100%' }}
            value={formData.medicine}
            onChange={handleMedicineChange}
          /> */}

          <h2>Medicine</h2>
          {formData.medicine.map((medicineName, index) => (
            <div key={index}>
              <input
                type="text"
                value={medicineName}
                onChange={(e) => handleMedicineChange(index, e.target.value)}
                placeholder="Medicine Name"
              />
              <button type="button" onClick={() => removeMedicine(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addMedicine}>Add Medicine</button>
          {/* <button type="submit">Submit</button> */}

        </form>
        <button type="submit">Submit</button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleViewPatientHistory}>View Patient History</button>
        <button onClick={handleRequestConsent}>Request Consent</button>
      </div>
    </div>
  );
};

export default CNForm;
