import React, { useState } from 'react';
import axios from 'axios';

export const AdminUpdateDoctorDetails = () => {
  const [email, setEmail] = useState(''); // State for doctor's email
  const [newSpeciality, setNewSpeciality] = useState(''); // State for new speciality input field
  const [newMobileNo, setNewMobileNo] = useState(''); // State for new mobile number input field
  const [newExperience, setNewExperience] = useState(''); // State for new experience input field
  const [error, setError] = useState(null); // State to store error message
  const [success, setSuccess] = useState(false); // State to indicate successful doctor details update

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = {
        email: email,
        newSpeciality: newSpeciality,
        newMobileNo: newMobileNo,
        newExperience: newExperience,
      };
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
      setEmail('');
      setNewSpeciality('');
      setNewMobileNo('');
      setNewExperience('');
    } catch (error) {
      setError(error.response.data.message); // Set error state if doctor details update fails
    }
  };

  return (
    <div>
      <h1>Update Doctor Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
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
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if present */}
        {success && <p style={{ color: 'green' }}>Doctor details updated successfully!</p>} {/* Display success message if doctor details update is successful */}
        <button type="submit">Update Details</button>
      </form>
    </div>
  );
};
