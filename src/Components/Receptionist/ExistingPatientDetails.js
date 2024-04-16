import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';
import toast from 'react-hot-toast';

export const ExistingPatientDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const patientInfo = location.state.patientDetails;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate API call to add patient
            console.log('Adding patient:', patientInfo);
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
                <div className="container doctor-details mt-5">
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
