import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';
import toast from 'react-hot-toast';
import MenuItem from '@mui/material/MenuItem';

export const AddPatientDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [patientInfo, setPatientInfo] = useState({
        name: location.state.patientInfo.name,
        mobileNo: location.state.patientInfo.mobileNo,
        dob: location.state.patientInfo.dob,
        gender: location.state.patientInfo.gender,
        bloodGroup: "",
        address: "",
        abhaId: location.state.patientInfo.abhaId
    });

    // useEffect(() => {
    //     console.log('Location:', location.state.patientInfo);
    //     setLoading(false);
    // }, [location]);

    // useEffect(() => {
    //     const fetchPatientData = async () => {
    //         // try {
    //         //     const abhaAdd = localStorage.getItem("abhaAddress")
    //         //     const token = localStorage.getItem("token");
    //         //     const formData = {
    //         //         abhaId: abhaAdd
    //         //     };
    //         //     console.log('Form Data in add Patient form:', formData);
    //         //     axios.defaults.withCredentials = true;
    //         //     const response = await axios.post("http://localhost:9191/receptionist/patientDetails", formData, {
    //         //         headers: { Authorization: `Bearer ${token}` },
    //         //     });

    //         //     const patientData = response.data;
    //         //     setPatientInfo({
    //         //         name: patientData.name,
    //         //         mobileNo: patientData.mobileNo,
    //         //         dob: patientData.dob,
    //         //         gender: patientData.gender,
    //         //         bloodGroup: "", // You may fetch this information if available
    //         //         address: "",//patientData.abhaAddress, // Assuming this is the patient's address
    //         //         abhaId: patientData.abhaId//patientData.abhaNumber
    //         //     });
    //         //     console.log(patientData);
    //         //     setLoading(false);
    //         // } catch (error) {
    //         //     console.error('Error fetching patient data:', error);
    //         // }
    //     };
    //     fetchPatientData();
    // }, []);



    // Removed handleChange since it's not needed for read-only fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo({ ...patientInfo, [name]: value });
    };

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
            const response = await axios.post(
                "http://localhost:9191/receptionist/addPatient",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log('Response:', response.data);
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

    return (
        <div className="h-full flex justify-center items-center ">
            <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
                <div className="image-container">
                    <img src={patientImage} className="admin-image" alt='patientImage' />
                    <div className="dashboard-name-patient" >ADD PATIENT</div>
                </div>
                <div className="container glass-background mt-5 doctor-details">
                    <form onSubmit={handleSubmit} style={{ width: '80%' }}>
                        <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
                            Enter Patient Details
                        </label>
                        <TextField
                            name="name"
                            label="Name"
                            value={patientInfo.name}
                            style={{ marginBottom: "1rem", width: "100%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="mobileNo"
                            label="Mobile Number"
                            value={patientInfo.mobileNo}
                            style={{ marginBottom: "1rem", width: "100%" }}
                            readOnly
                            disabled
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "2rem",
                            }}
                        >
                            <TextField
                                name="dob"
                                label="Date of Birth"
                                value={patientInfo.dob}
                                style={{ marginBottom: "1rem", width: "50%" }}
                                readOnly
                                disabled
                            />
                            <TextField
                                name="gender"
                                label="Gender"
                                value={patientInfo.gender}
                                style={{ marginBottom: "1rem", width: "50%" }}
                                readOnly
                                disabled
                            />
                        </div>
                        <TextField
                            select
                            name="bloodGroup"
                            label="Blood Group"
                            value={patientInfo.bloodGroup}
                            style={{ marginBottom: "1rem", width: "100%" }}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                        </TextField>
                        <TextField
                            name="address"
                            label="Address"
                            value={patientInfo.address}
                            style={{ marginBottom: "1rem", width: "100%" }}
                            onChange={handleChange}
                            required
                        // readOnly
                        // disabled
                        />
                        <TextField
                            name="abhaId"
                            label="Abha ID"
                            value={patientInfo.abhaId}
                            style={{ marginBottom: "1rem", width: "100%" }}
                            readOnly
                            disabled
                        />
                        <div className='d-flex justify-content-center'>
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="button"
                                    style={{ marginTop: '2rem', width: "80%", height: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    onClick={handleSubmit}>Submit</button>
                            )}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
