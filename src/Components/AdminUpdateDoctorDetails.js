import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export const AdminUpdateDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorDetails = location.state?.doctor; // Using optional chaining to handle null value
  const email = doctorDetails?.email;
  // const doctorDetails = location.state?.doctor;
  // // console.log('Doctor details:', doctorDetails);
  // const email = doctorDetails?.email; // State for doctor's email
  const [newSpeciality, setNewSpeciality] = useState(doctorDetails?.speciality); // State for new speciality input field
  const [newMobileNo, setNewMobileNo] = useState(doctorDetails?.mobileNo); // State for new mobile number input field
  const [newExperience, setNewExperience] = useState(doctorDetails?.experience); // State for new experience input field
  const [error, setError] = useState(null); // State to store error message
  const [success, setSuccess] = useState(false); // State to indicate successful doctor details update


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // if (!doctorDetails) {
    //   navigate("/");
    // }
    if (!token) {
      navigate("/");
    }
    if (role === "Receptionist") {
      navigate("/");
      localStorage.clear();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = {
        email: email,
        speciality: newSpeciality,
        mobileNo: newMobileNo,
        experience: newExperience
      };
      console.log('Form data:', formData);
      // Send doctor details update request to backend
      const response = await axios.post(
        'http://localhost:9191/doctor/updateDoctor',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true); // Set success state to true upon successful doctor details update
      // Clear form fields
      // setEmail('');
      // setNewSpeciality('');
      // setNewMobileNo('');
      // setNewExperience('');
    } catch (error) {
      console.error('Error updating doctor details:', error);
      setError(error.response.data.message); // Set error state if doctor details update fails
    }
  };

  // const handleTextFieldChange = (event) => {
  //   const { id, value } = event.target;
  //   setformData({ ...formData, [id]: value });
  // };

  return (
    <div>
      <h1>Update Doctor Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={doctorDetails.email}
            // onChange={(e) => setEmail(e.target.value)} // Update email state on change
            readOnly
          />
        </div>
        <div>
          <label htmlFor="newSpeciality">New Speciality:</label>
          <input
            type="text"
            id="newSpeciality"
            value={newSpeciality}
            onChange={(e) => setNewSpeciality(e.target.value)} // Update new speciality state on change
          />
        </div>
        <div>
          <label htmlFor="newMobileNo">New Mobile No:</label>
          <input
            type="text"
            id="newMobileNo"
            value={newMobileNo}
            onChange={(e) => setNewMobileNo(e.target.value)} // Update new mobile number state on change
          />
        </div>
        <div>
          <label htmlFor="newExperience">New Experience:</label>
          <input
            type="text"
            id="newExperience"
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)} // Update new experience state on change
          />
        </div>
        {
          error && 
          <p style={{ color: 'red' }}></p>} {/* Display error message if present */}
        {
          success &&
          <p style={{ color: 'green' }}>Doctor details updated successfully!</p>} {/* Display success message if doctor details update is successful */}
        <button type="submit">Update Details</button>
      </form>
    </div>
  );
};






// import React, { useState } from "react";

// export const AdminUpdateDoctorDetails = ({ defaultDoctorDetails, onSubmit }) => {
//   const [newSpeciality, setNewSpeciality] = useState(defaultDoctorDetails.speciality);
//   const [newMobileNo, setNewMobileNo] = useState(defaultDoctorDetails.mobileNo);
//   const [newExperience, setNewExperience] = useState(defaultDoctorDetails.experience);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Construct updated doctor details object
//     const updatedDoctorDetails = {
//       ...defaultDoctorDetails, // Include all default details
//       speciality: newSpeciality, // Update speciality
//       mobileNo: newMobileNo, // Update mobile number
//       experience: newExperience // Update experience
//     };
    
//     // Call onSubmit function with updated doctor details
//     onSubmit(updatedDoctorDetails);
//   };

//   return (
//     <div>
//       <h1>Update Doctor Details</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={defaultDoctorDetails.email}
//             readOnly // Make email field read-only
//           />
//         </div>
//         <div>
//           <label htmlFor="newSpeciality">New Speciality:</label>
//           <input
//             type="text"
//             id="newSpeciality"
//             value={newSpeciality}
//             onChange={(e) => setNewSpeciality(e.target.value)} // Update new speciality state on change
//           />
//         </div>
//         <div>
//           <label htmlFor="newMobileNo">New Mobile No:</label>
//           <input
//             type="text"
//             id="newMobileNo"
//             value={newMobileNo}
//             onChange={(e) => setNewMobileNo(e.target.value)} // Update new mobile number state on change
//           />
//         </div>
//         <div>
//           <label htmlFor="newExperience">New Experience:</label>
//           <input
//             type="text"
//             id="newExperience"
//             value={newExperience}
//             onChange={(e) => setNewExperience(e.target.value)} // Update new experience state on change
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if present */}
//         {success && <p style={{ color: 'green' }}>Doctor details updated successfully!</p>} {/* Display success message if doctor details update is successful */}
//         <button type="submit">Update Details</button>
//       </form>
//     </div>
//   );
// };

// // export default UpdateDoctorDetailsForm;
