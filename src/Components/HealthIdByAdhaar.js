import React from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
// import TextField from "@mui/material/TextField";

export const HealthIdByAdhaar = () => {
//   const [aadhaarNo, setAadhaarNo] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(aadhaarNo);
    try {
      const token = localStorage.getItem("token");
      const formData = { 
        "consent": true,
        "consentVersion": "v1.0"
       };
      const response = await axios.post("http://localhost:9191/receptionist/createHealthIdByAadhaar", 
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      console.log('Response:', response.data);
      navigate('/receptionist/abha-id-display-and-add', { state: response.data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <TextField
        id="aadhaarNo"
        label="Aadhaar No"
        value={aadhaarNo}
        onChange={(e) => setAadhaarNo(e.target.value)}
        required
      /> */}
      <button
          type="submit"
          className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          style={{marginBottom: '-100px', marginTop: '1rem', width: "100%", height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >Click Only if Patient Gives Consent</button>
    </form>
  );
}
