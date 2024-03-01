import React from 'react';
import Form from './Form'; // Import the AddressForm component
import receptionist from '../assets/receptionist_11833579-removebg-preview.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalFormLayout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
  }, []);
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center mt-10 ml-20 pl-10 pt-20' >
         <h1 className='font-bold text-6xl'>ABHA ID<br></br>CREATION</h1>
      </div>
      <div className='flex justify-center items-center mt-20 pt-10' >
        <Form />
      </div>
    </div>
  );
};

export default HospitalFormLayout;


// style={{ backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}