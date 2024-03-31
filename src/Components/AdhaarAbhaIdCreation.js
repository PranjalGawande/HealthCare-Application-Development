// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import TextField from "@mui/material/TextField";

// export const AdhaarAbhaIdCreation = () => {
//   const [aadhaarNo, setAadhaarNo] = useState("");
//   const navigate = useNavigate();

//   const handleTextFieldChange = (event) => {
//     const { id, value } = event.target;
//     setAadhaarNo({ ...aadhaarNo, [id]: value });
//     console.log(aadhaarNo);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(aadhaarNo);
//     try {
//       const token = localStorage.getItem("token");
//       const formData = { 
//         aadhaarNumber: aadhaarNo
//        };
//       const response = await axios.post("http://localhost:9191/receptionist/generateAadhaarOtp", 
//       formData,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//       );
//       console.log('Response:', response.data);
//       navigate('/receptionist/adhaar-otp-verification');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         // type="number"
//         id="aadhaarNo"
//         label="Aadhaar No"
//         value={aadhaarNo}
//         onChange={(e) => setAadhaarNo(e.target.value)}
//         // onChange={handleTextFieldChange}
//         required
//       />
//       <button type="button"
//           onClick={handleSubmit}
//           className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//           style={{marginBottom: '-100px', marginTop: '1rem', width: "100%", height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
//         >Submit</button>
//     </form>
//   );
// }












import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { NavLink } from 'react-router-dom';
import patientImage from '../assets/PatientPage.png';


export const AdhaarAbhaIdCreation = () => {
  const [aadhaarNo, setAadhaarNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(aadhaarNo);
    try {
      const token = localStorage.getItem("token");
      const formData = {
        aadhaarNumber: aadhaarNo
      };
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:9191/receptionist/generateAadhaarOtp",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Response:', response.data);
      navigate('/receptionist/adhaar-otp-verification');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    // <form onSubmit={handleSubmit}>
    //   <TextField
    //     id="aadhaarNo"
    //     label="Aadhaar No"
    //     value={aadhaarNo}
    //     onChange={(e) => setAadhaarNo(e.target.value)}
    //     required
    //   />
    //   <button
    //       type="submit"
    //       className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    //       style={{marginBottom: '-100px', marginTop: '1rem', width: "100%", height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    //     >Submit</button>
    // </form>




    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" />
          <div className="dashboard-name-patient" >ABHA CREATION</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Enter <br /> Aadhaar Number
          </label>
          <TextField
            id="aadhaarNo"
            label="Aadhaar No"
            value={aadhaarNo}
            style={{ marginBottom: "2rem", width: "50%" }}
            onChange={(e) => setAadhaarNo(e.target.value)}
            required
          />
              {/* Add buttons with respective functionalities */}
              <button
                // className="btn btn-primary me-2" 
                type="submit"
                className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                onClick={handleSubmit}>Update Details</button>


        </div>

      </div>
    </div>
  );
}
