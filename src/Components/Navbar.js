import React from 'react';

export default function Navbar() {
  return (
    <div className='flex flex-wrap justify-between items-center bg-black'>
            <button type="button" 
                className="mt-2 ml-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Home</button>
            <h2 className='mt-2 font-serif text-xl text-white'>HEALTH SYNC</h2>
            <button type="button" 
                className="mt-2 mr-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
        </div>
        
        
    
  )
}
