import React from 'react'
import FormVeri from './FormV'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
  }, []);
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center mt-10 ml-20 pl-10 pr-10 pt-20' >
         <h1 className='font-bold text-6xl'>ABHA ID<br></br>VERIFICATION</h1>
      </div>
      <div className='flex justify-center items-center mt-20 pt-10' >
        <FormVeri />
      </div>
    </div>
  )
}

export default VerificationForm;
