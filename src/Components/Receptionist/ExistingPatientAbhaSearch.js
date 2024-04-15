


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import patientImage from '../../assets/PatientPage.png';

// export const ExistingPatientAbhaSearch = () => {
//   const [abhaAdd, setAbhaAdd] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const formData = {
//         abhaid: abhaAdd
//       };
//       axios.defaults.withCredentials = true;
//       const response = await axios.post("http://localhost:9191/receptionist/*****", // Add the endpoint here
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log('Response:', response.data);
//       navigate('/receptionist/existing-patient-details');
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }

//   };


//   return (
//     <div className="h-full flex justify-center items-center ">
//       <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
//         <div className="image-container">
//           <img src={patientImage} className="admin-image" alt='patientImage' />
//           <div className="dashboard-name-patient" >ABHA SEARCH</div>
//         </div>
//         <div className="container glass-background mt-5">
//           <label className="text-login fw-bold text-center">
//             Enter <br /> Abha Address
//           </label>
//           <TextField
//             id="abhaid"
//             label="Abha Address"
//             value={abhaAdd}
//             style={{ marginBottom: "2rem", width: "50%" }}
//             onChange={(e) => setAbhaAdd(e.target.value)}
//             required
//           />
//           {/* <button
//             type="submit"
//             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//             style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//             onClick={handleSubmit}>Submit</button> */}

//           {loading ? (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
//               <div class="loader"></div>
//             </div>
//           ) : (
//             <button
//               type="submit"
//               className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//               style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//               onClick={handleSubmit}>Submit</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






















































import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';

export const ExistingPatientAbhaSearch = () => {
  const [abhaAdd, setAbhaAdd] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = {
        abhaId: abhaAdd
      };
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:9191/receptionist/patientDetails", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response.data);
      navigate('/receptionist/existing-patient-details', { state: { patientDetails: response.data } });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt='patientImage' />
          <div className="dashboard-name-patient" >ABHA SEARCH</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Enter <br /> Abha Address
          </label>
          <TextField
            id="abhaid"
            label="Abha Address"
            value={abhaAdd}
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={(e) => setAbhaAdd(e.target.value)}
            required
          />
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <div className="loader"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

// // ExistingPatientDetails Component
// export const ExistingPatientDetails = ({ location }) => {
//   const patientDetails = location.state.patientDetails;

//   return (
//     <div>
//       <h2>Patient Details</h2>
//       <p>Name: {patientDetails.name}</p>
//       <p>Age: {patientDetails.age}</p>
//       {/* Add more fields as needed */}
//     </div>
//   );
// };
