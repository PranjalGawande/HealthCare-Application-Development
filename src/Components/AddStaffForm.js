import React, { useState } from 'react';
import { ASForm } from './ASForm';
import Navbar from './Navbar';

const AddStaffForm = () => {
    return (
      <div>
        <Navbar></Navbar>
        <div className='flex justify-center items-center'>
          <div className='flex justify-center items-center mt-10 ml-20 pl-10 pt-20' >
             <h1 className='font-bold text-6xl'>ADD NEW<br></br>STAFF</h1>
          </div>
          <div className='flex justify-center items-center mt-20 pt-10' >
            <ASForm/>
          </div>
        </div>
      </div>
        
      );
};

export default AddStaffForm;
