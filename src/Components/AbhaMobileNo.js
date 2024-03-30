// import React from 'react'

// export const AbhaMobileNo = () => {
//   return (
//     <div>AbhaMobileNo</div>
//   )
// }






import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";

export const AbhaMobileNo = () => {
  const [abhaMobNo, setAbhaMobNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(abhaMobNo);
    try {
      const token = localStorage.getItem("token");
      const formData = { 
        mobileNo: abhaMobNo
       };
      const response = await axios.post("http://localhost:9191/receptionist/setAbdmMobileNumber", 
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      console.log('Response:', response.data);
      if(response.data.mobileLinked === 'true'){
        navigate('/receptionist/health-id-adhaar');
      }else{
        navigate('/receptionist/abha-new-mobile-no-verification');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="abhaMobNo"
        label="Abha Mobile No"
        value={abhaMobNo}
        onChange={(e) => setAbhaMobNo(e.target.value)}
        required
      />
      <button
          type="submit"
          className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          style={{marginBottom: '-100px', marginTop: '1rem', width: "100%", height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >Submit</button>
    </form>
  );
}
