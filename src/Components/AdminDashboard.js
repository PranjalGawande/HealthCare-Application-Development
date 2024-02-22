import React from 'react'
import admin from '../assets/ADMIN.png';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
        {/* <Navbar></Navbar> */}
        <div className="h-full flex justify-center items-center mt-20">
        <div className='flex justify-evenly items-center gap-40 mt-20 border-amber-300 border-solid '>
            <div className='border border-gray p-5 rounded-md bg-slate-200'>
                <img src={admin} className="w-64 h-64"></img>
            </div>
            <div className='flex flex-col gap-5 '>
              <NavLink to="/admin/add-doctor" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD NEW DOCTOR</NavLink>
              <NavLink to="/admin/add-receptionist" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD NEW RECEPTIONIST</NavLink>
              <NavLink to="/admin/view-doctor-info" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">VIEW DOCTOR INFO</NavLink>
              <NavLink to="/admin/view-receptionist-info" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">VIEW RECEPTIONIST INFO</NavLink>
                {/* <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD NEW DOCTOR</button> */}
                {/* <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ADD NEW RECEPTIONIST</button> */}
                {/* <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">VIEW DOCTOR INFO</button> */}
                {/* <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">VIEW RECEPTIONIST INFO</button> */}
            </div>
        </div>
    </div>
    </div>
    
  )
}
export default AdminDashboard;
