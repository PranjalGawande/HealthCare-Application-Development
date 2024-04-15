// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import patientImage from '../../assets/PatientPage.png';
// import toast from 'react-hot-toast';


// export const ExistingPatientDetails = ({ patientDetails }) => {
// //   return (
// //     <div>
// //       <h2>Patient Details</h2>
// //       {patientDetails ? (
// //         <div>
// //           <p>Name: {patientDetails.name}</p>
// //           <p>Age: {patientDetails.age}</p>
// //           {/* Add more fields as needed */}
// //         </div>
// //       ) : (
// //         <p>No patient details available</p>
// //       )}
// //     </div>
// //   );
// // };
// const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [patientInfo, setPatientInfo] = useState({
//         name: "",
//         mobileNo: "",
//         dob: "",
//         gender: "",
//         bloodGroup: "",
//         address: "",
//         abhaId: ""
//     });

//     useEffect(() => {
//         fetchPatientData();
//     }, []);

//     const fetchPatientData = async () => {
//         try {
//             const response = await axios.get("http://localhost:9191/getPatientInfo");
//             const patientData = response.data;
//             setPatientInfo({
//                 name: patientData.name,
//                 mobileNo: patientData.mobileNumber,
//                 dob: patientData.dateOfBirth,
//                 gender: patientData.gender,
//                 bloodGroup: "", // You may fetch this information if available
//                 address: "",//patientData.abhaAddress, // Assuming this is the patient's address
//                 abhaId: patientData.abhaAddress//patientData.abhaNumber
//             });
//             console.log(patientData);
//         } catch (error) {
//             console.error('Error fetching patient data:', error);
//         }
//     };

//     // Removed handleChange since it's not needed for read-only fields

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const token = localStorage.getItem("token");
//             const formData = {
//                 abhaAddress: patientInfo.abhaId,
//                 bloodGroup: patientInfo.bloodGroup,
//                 address: patientInfo.address
//             };
//             const response = await axios.post(
//                 "http://localhost:9191/receptionist/addPatient",
//                 formData,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             console.log('Response:', response.data);
//             toast.success('Patient Added Successfully');
//             setTimeout(() => {
//                 navigate('/receptionist/add-appointment');
//             }, 2000);
//         } catch (error) {
//             toast.error('Error in Adding Patient');
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddAppointment = () => {
//         navigate('/receptionist/add-appointment');
//     };

//     return (
//         <div className="h-full flex justify-center items-center ">
//             <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
//                 <div className="image-container">
//                     <img src={patientImage} className="admin-image" alt='patientImage' />
//                     <div className="dashboard-name-patient" >EXISTING PATIENT DETAILS</div>
//                 </div>
//                 <div className="container glass-background mt-5">
//                     <form onSubmit={handleSubmit}>
//                         <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
//                             Patient Details
//                         </label>
//                         <TextField
//                             name="name"
//                             label="Name"
//                             value={patientInfo.name}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="mobileNo"
//                             label="Mobile Number"
//                             value={patientInfo.mobileNo}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="dob"
//                             label="Date of Birth"
//                             value={patientInfo.dob}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="gender"
//                             label="Gender"
//                             value={patientInfo.gender}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="bloodGroup"
//                             label="Blood Group"
//                             value={patientInfo.bloodGroup}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="address"
//                             label="Address"
//                             value={patientInfo.address}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="abhaId"
//                             label="Abha ID"
//                             value={patientInfo.abhaId}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <button
//                             type="submit"
//                             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                             style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//                         >
//                             {loading ? 'Submitting...' : 'Submit'}
//                         </button>
//                     </form>
//                     <button
//                         className="button mt-4"
//                         onClick={handleAddAppointment}
//                         style={{ width: "78%" }}
//                     >
//                         Add Appointment
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }






import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';
import toast from 'react-hot-toast';

export const ExistingPatientDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const patientInfo = location.state.patientInfo;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const formData = {
                abhaAddress: patientInfo.abhaId,
                bloodGroup: patientInfo.bloodGroup,
                address: patientInfo.address
            };
            // Simulate API call to add patient
            console.log('Adding patient:', formData);
            toast.success('Patient Added Successfully');
            setTimeout(() => {
                navigate('/receptionist/add-appointment');
            }, 2000);
        } catch (error) {
            toast.error('Error in Adding Patient');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAppointment = () => {
        navigate('/receptionist/add-appointment');
    };

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid">
                <div className="image-container">
                    <img src={patientImage} className="admin-image" alt='patientImage' />
                    <div className="dashboard-name-patient">PATIENT DETAILS</div>
                </div>
                <div className="container glass-background mt-5">
                    <form onSubmit={handleSubmit}>
                        <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
                            Patient Details
                        </label>
                        <TextField
                            name="name"
                            label="Name"
                            value={patientInfo.name}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="mobileNo"
                            label="Mobile Number"
                            value={patientInfo.mobileNo}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="dob"
                            label="Date of Birth"
                            value={patientInfo.dob}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="gender"
                            label="Gender"
                            value={patientInfo.gender}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="bloodGroup"
                            label="Blood Group"
                            value={patientInfo.bloodGroup}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="address"
                            label="Address"
                            value={patientInfo.address}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="abhaId"
                            label="Abha ID"
                            value={patientInfo.abhaId}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        {/* <button
                            type="submit"
                            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button> */}
                    </form>
                    <button
                        className="button mt-4"
                        onClick={handleAddAppointment}
                        style={{ width: "78%" }}
                    >
                        Add Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}
