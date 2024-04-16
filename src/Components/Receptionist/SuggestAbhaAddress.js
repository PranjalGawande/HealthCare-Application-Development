// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TextField from "@mui/material/TextField";
// import patientImage from '../../assets/PatientPage.png';
// import toast from "react-hot-toast";

// export const SuggestAbhaAddress = () => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [userChoice, setUserChoice] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchSuggestions();
//   }, []);

//   const fetchSuggestions = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:9191/receptionist/suggestAbhaAddress", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuggestions(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUserChoiceChange = (e) => {
//     setUserChoice(e.target.value);
//   };

//   return (

//      <div className="h-full flex justify-center items-center ">
//       <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">

//     <div className="image-container">
//     <img src={patientImage} className="admin-image" alt='patientImage' />
//     <div className="dashboard-name-patient">ABHA CREATION</div>
//   </div>
//     {/* <div className="h-full flex justify-center items-center">
//       <div className="container glass-background mt-5">
//         <h1 className="text-2xl font-semibold mb-4">Suggestions for Abha Address</h1>
//         {loading ? (
//           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
//             <div className="loader"></div>
//           </div>
//         ) : (
//           <ul>
//             {suggestions.map((suggestion, index) => (
//               <li key={index}>{suggestion}</li>
//             ))}
//           </ul>
//         )}
//         <div className="mt-5">
//           <TextField
//             id="userChoice"
//             label="Enter Your Choice of Abha Address"
//             value={userChoice}
//             onChange={handleUserChoiceChange}
//             required
//             style={{ marginBottom: "2rem", width: "50%" }}
//           />
//           <button
//             type="submit"
//             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//             style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div> */}

//     <div className="container glass-background mt-5">
//           <label className="text-login fw-bold text-center">
//             Enter <br /> Abdm Address
//           </label>
//           <h1 className="text-2xl font-semibold mb-4">Suggestions for Abha Address</h1>
//         {loading ? (
//           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
//             <div className="loader"></div>
//           </div>
//         ) : (
//           <ul>
//             {suggestions.map((suggestion, index) => (
//               <li key={index}>{suggestion}</li>
//             ))}
//           </ul>
//         )}
//           <TextField
//              id="userChoice"
//             label="Abha Address"
//             value={userChoice}
//             onChange={handleUserChoiceChange}
//             required
//             style={{ marginBottom: "2rem", width: "50%" }}
//           />
//           <button
//             type="submit"
//             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//             style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//             >Submit</button>
//         </div>
//     </div>
//     </div>

//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const SuggestAbhaAddress = () => {
  // const [suggestions, setSuggestions] = useState([]);
  const [userChoice, setUserChoice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {

    // const fetchSuggestions = async () => {
    //   setLoading(true);
    //   try {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.post(
    //       "http://localhost:9191/receptionist/suggestAbhaAddress",
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );
    //     const formattedSuggestions = response.data.map((suggestion) => {
    //       // Split suggestion string by '.' to separate different parts
    //       const parts = suggestion.split(".");
    //       // Replace '_' with a space within each part
    //       const formattedParts = parts.map((part) => part.replace("_", " "));
    //       // Join the parts with a space and return
    //       return formattedParts.join(" ");
    //     });
    //     setSuggestions(formattedSuggestions);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

  //   const fetchSuggestions = async () => {
  //     setLoading(true);
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.post(
  //         "http://localhost:9191/receptionist/suggestAbhaAddress",
  //         null,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       const suggestedAddresses = response.data;
  //       // const formattedSuggestions = Object.entries(suggestedAddresses).map(([index, suggestion]) => {
  //       //   return { index: parseInt(index), address: suggestion };
  //       // });
  //       setSuggestions(suggestedAddresses);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       toast.error("Error fetching suggestions");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    

  //   fetchSuggestions();
  // }, []);

  // const fetchSuggestions = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       "http://localhost:9191/receptionist/suggestAbhaAddress",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setSuggestions(response.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // const fetchSuggestions = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       "http://localhost:9191/receptionist/suggestAbhaAddress",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const formattedSuggestions = response.data.map((suggestion) => {
  //       // Split suggestion string by '.' to separate different parts
  //       const parts = suggestion.split(".");
  //       // Replace '_' with a space within each part
  //       const formattedParts = parts.map((part) => part.replace("_", " "));
  //       // Join the parts with a space and return
  //       return formattedParts.join(" ");
  //     });
  //     setSuggestions(formattedSuggestions);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleUserChoiceChange = (e) => {
    setUserChoice(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = { abhaAddress: userChoice, password: "" };

      axios.defaults.withCredentials = true;
      await axios.post(
        "http://localhost:9191/receptionist/createAbhaAddress",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Abha Address submitted successfully");
      navigate("/receptionist/new-patient");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit Abha Address");
    }
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt="patientImage" />
          <div className="dashboard-name-patient">ABHA CREATION</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Enter <br /> Abdm Address
          </label>
          {/* <h1 className="text-2xl font-semibold mb-4">
            Suggestions for Abha Address
          </h1> */}
          {/* {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )} */}
{/* 
          {loading ? (
             <div
               style={{
                 display: "flex",
                 justifyContent: "center",
                 marginTop: "1rem",
               }}
             >
               <div className="loader"></div>
             </div>
           ) : (
             <ul>
               {suggestions.map((suggestion, index) => (
                 <li key={index}>{suggestion}</li>
               ))}
             </ul>
           )} */}


          <TextField
            id="userChoice"
            label="Abha Address"
            value={userChoice}
            onChange={handleUserChoiceChange}
            required
            style={{ marginBottom: "2rem", width: "50%" }}
          />
          <button
            type="submit"
            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            style={{
              marginTop: "2rem",
              width: "50%",
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TextField from "@mui/material/TextField";
// import patientImage from "../../assets/PatientPage.png";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export const SuggestAbhaAddress = () => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [userChoice, setUserChoice] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSuggestions();
//   }, []);

  // const fetchSuggestions = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       "http://localhost:9191/receptionist/suggestAbhaAddress",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const formattedSuggestions = response.data.map((suggestion) => {
  //       // Split suggestion string by '.' to separate different parts
  //       const parts = suggestion.split(".");
  //       // Replace '_' with a space within each part
  //       const formattedParts = parts.map((part) => part.replace("_", " "));
  //       // Join the parts with a space and return
  //       return formattedParts.join(" ");
  //     });
  //     setSuggestions(formattedSuggestions);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const handleUserChoiceChange = (e) => {
//     setUserChoice(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const formData = { address: userChoice, password: "" };

//       axios.defaults.withCredentials = true;
//       await axios.post(
//         "http://localhost:9191/receptionist/createAbhaAddress",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Abha Address submitted successfully");
//       navigate("/receptionist/new-patient");
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Failed to submit Abha Address");
//     }
//   };

//   return (
//     <div className="h-full flex justify-center items-center ">
//       <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
//         <div className="image-container">
//           <img src={patientImage} className="admin-image" alt="patientImage" />
//           <div className="dashboard-name-patient">ABHA CREATION</div>
//         </div>
//         <div className="container glass-background mt-5">
//           <label className="text-login fw-bold text-center">
//             Enter <br /> Abdm Address
//           </label>
//           <h1 className="text-2xl font-semibold mb-4">
//             Suggestions for Abha Address
//           </h1>
//           {loading ? (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: "1rem",
//               }}
//             >
//               <div className="loader"></div>
//             </div>
//           ) : (
//             <ul>
//               {suggestions.map((suggestion, index) => (
//                 <li key={index}>{suggestion}</li>
//               ))}
//             </ul>
//           )}
//           <TextField
//             id="userChoice"
//             label="Abha Address"
//             value={userChoice}
//             onChange={handleUserChoiceChange}
//             required
//             style={{ marginBottom: "2rem", width: "50%" }}
//           />
//           <button
//             type="submit"
//             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//             style={{
//               marginTop: "2rem",
//               width: "50%",
//               height: "10%",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
