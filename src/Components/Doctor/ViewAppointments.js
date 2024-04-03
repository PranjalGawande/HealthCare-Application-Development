import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export const ViewAppointments = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchDoctorDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const formData = {};

      const response = await axios.post(
        'http://localhost:9191/doctor/doctorDetails',
        formData,
        { headers: headers }
      );

      setDoctorDetails(response.data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const handlePatientAbsent = async (appointment) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const AppformData = {};
      const response = await axios.post(`http://localhost:9191/doctor/addPatientRecord/${appointment.tokenNo}`,
        AppformData,
        { headers: headers }
      );

      console.log('response', response);
      if (response.status === 200) {
        fetchDoctorDetails();
      } else {
        console.error('Error marking patient absent:', response.data);
      }
    } catch (error) {
      console.error('Error marking patient absent:', error);
    }
  };

  const handleStartConsultation = async (appointment) => {
    navigate('/doctor/consultation-form', { state: { appToken: appointment.tokenNo } });

  };

  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  const sortedAppointments = [...doctorDetails?.appointmentsList || []].sort((a, b) => a.tokenNo - b.tokenNo);
  const leastTokenAppointment = sortedAppointments?.[0];

  return (
    <div className="container mt-10">
      <h1>Doctor Appointments</h1>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Token No</th>
              <th>Time</th>
              <th>Reason for Visit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map(appointment => (
              <tr key={appointment.tokenNo}>
                <td>{appointment.tokenNo}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reasonForVisit}</td>
                <td>
                  {appointment.tokenNo === leastTokenAppointment.tokenNo && (
                    <div>
                      <button className="btn btn-danger me-2" onClick={() => handlePatientAbsent(appointment)}>
                        Patient Absent
                      </button>
                      <button className="btn btn-primary me-2" onClick={() => handleStartConsultation(appointment)}>
                        Start Consultation
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAppointments;