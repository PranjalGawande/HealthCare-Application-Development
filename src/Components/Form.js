import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddressForm = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div className='flex'>
      <div>------------------------</div>
      <h2 > ENTER DETAILS </h2>
      <div>------------------------</div>
      </div>
      <form style={{ width: '50%', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            id="first-name"
            label="First name"
            variant="outlined"
            size="small"
            style={{ marginBottom: '2rem', width: '48%' }}
          />
          <TextField
            id="last-name"
            label="Last name"
            variant="outlined"
            size="small"
            style={{ marginBottom: '2rem', width: '48%' }}
          />
        </div>
        <TextField
          id="adhaar-no"
          label="Adhaar No."
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
        />
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
        />
        <TextField
          id="dob"
          label="Date of Birth"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
        />
        {/* <Button variant="contained" color="primary" style={{ marginTop: '1rem', width: '100%' }}>
          Submit
        </Button> */}
        <button type="button" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>
      </form>
    </div>
  );
};

export default AddressForm;