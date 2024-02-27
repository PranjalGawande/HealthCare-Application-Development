// import React, { useState } from 'react';
// import { ADForm } from './ADForm';
// import { AddLoginCred } from './AddLoginCred';
// import Navbar from './Navbar';

// const AddDoctorForm = () => {
//     return (
//         <div>
//             {/* <Navbar></Navbar> */}
//             <div className='flex flex-wrap justify-center items-center'>
//           <div className='flex justify-center items-center mt-10 ml-20 pl-10 pt-20' >
//              <h1 className='font-bold text-6xl'>ADD NEW<br></br>DOCTOR</h1>
//           </div>
//           <div className='flex justify-center items-center mt-20 pt-10' >
//             <AddLoginCred/>
//             <ADForm/>
//           </div>
//         </div>
//         </div>
//       );
// };

// export default AddDoctorForm;

import React, { useState } from 'react';
import { ADForm } from './ADForm';
import AddLoginCred from './AddLoginCred';
import Navbar from './Navbar';

const AddDoctorForm = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);

    // Function to handle successful submission of login credentials
    const handleLoginSuccess = () => {
        setLoginSuccess(true);
    };

    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className='flex flex-wrap justify-center items-center'>
                <div className='flex justify-center items-center mt-10 ml-20 pl-10 pt-20' >
                    <h1 className='font-bold text-6xl'>ADD NEW<br></br>DOCTOR</h1>
                </div>
                <div className='flex justify-center items-center mt-20 pt-10' >
                    {!loginSuccess && <AddLoginCred onSuccess={handleLoginSuccess} />}
                    {loginSuccess && <ADForm />}
                </div>
            </div>
        </div>
    );
};

export default AddDoctorForm;

