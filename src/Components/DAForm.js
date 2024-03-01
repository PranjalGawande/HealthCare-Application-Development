import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const DAForm = ({ patientId, doctorId }) => {

  const [formData, setFormData] = useState({
    date: 'dd-mm-yy', // Default date
    time: '00:00', // Default time
    reasonForVisit: '', // Default reason for visit
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`localhost:9191/staff/${patientId}/${doctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      // Handle success
      console.log('Appointment created successfully');
    } catch (error) {
      console.error('Error creating appointment:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='flex'>
        <div>------------------------</div>
        <h2>ENTER DETAILS</h2>
        <div>------------------------</div>
      </div>
      <form style={{ width: '50%', marginTop: '2rem' }} onSubmit={handleSubmit}>
        <TextField
          id="date"
          label="Date"
          type="date"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          value={formData.date}
          onChange={handleChange}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          value={formData.time}
          onChange={handleChange}
        />
        <TextField
          id="reasonForVisit"
          label="Reason for Visit"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          value={formData.reasonForVisit}
          onChange={handleChange}
        />
        <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Verify</button>
      </form>
    </div>
  );
};

export default DAForm;
