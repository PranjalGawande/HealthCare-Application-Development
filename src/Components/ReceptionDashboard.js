import React from 'react'
import receptionist from '../assets/receptionist_11833579-removebg-preview.png'; 
import Navbar from './Navbar';

export default function ReceptionDashboard() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="h-full flex justify-center items-center mt-20">
        <div className='flex justify-evenly items-center gap-40 mt-20 border-amber-300 border-solid '>
            <div className='border border-gray p-5 rounded-md bg-slate-200'>
                <img src={receptionist} className="w-64 h-64"></img>
            </div>
            <div className='flex flex-col gap-5 '>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ABHA ID CREATION</button>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ABHA ID VERIFICATION</button>
                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">DOCTOR'S APPOINTMENT</button>
            </div>
        </div>
    </div>
    </div>
  )
}
