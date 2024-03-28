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





















import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const CNForm = ({ patientId, doctorId }) => {
  const location = useLocation();
  const appointToken = location.state?.appToken || null; // Check if appToken exists in the location state
  console.log("apptoken: ",appointToken);
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!appointToken) {
        // Handle the case when appToken is not available
        console.error('Appointment token not found');
        return;
      }
      
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:9191/doctor/addPatientRecord/${appointToken}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to submit consultation form');
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
        {/* Input fields */}
        //       <form style={{ width: '50%', marginTop: '2rem' }} onSubmit={handleSubmit}>
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
        <TextField
          id="medicine"
          label="Medicine"
          variant="outlined"
          size="small"
          style={{ marginBottom: '1rem', width: '100%' }}
          value={formData.medicine}
          onChange={handleChange}
        />
  
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
