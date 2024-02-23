import React, { useState } from 'react';
import { ADForm } from './ADForm';
import Navbar from './Navbar';

const AddDoctorForm = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex flex-wrap justify-center items-center'>
          <div className='flex justify-center items-center mt-10 ml-20 pl-10 pt-20' >
             <h1 className='font-bold text-6xl'>ADD NEW<br></br>DOCTOR</h1>
          </div>
          <div className='flex justify-center items-center mt-20 pt-10' >
            <ADForm/>
          </div>
        </div>
        </div>
      );
};

export default AddDoctorForm;
