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
import AddLoginCredDoc from './AddLoginCredDoc';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDoctorForm = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [email, setEmail] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login page if token doesn't exist
          navigate("/");
        }
      }, []);

    const handleLoginSuccess = (email) => {
      setEmail(email);
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
                    {!loginSuccess && <AddLoginCredDoc onSuccess={handleLoginSuccess}  />}
                    {loginSuccess && <ADForm email={email}/>}
                </div>
            </div>
        </div>
    );
};

export default AddDoctorForm;

