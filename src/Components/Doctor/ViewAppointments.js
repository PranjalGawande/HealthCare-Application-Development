import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const ViewAppointments = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [doctordtl, setDoctorDtl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchDoctorDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const formData = {};

      const response = await axios.post(
        "http://localhost:9191/doctor/doctorDetails",
        formData,
        { headers: headers }
      );

      setDoctorDetails(response.data);
    } catch (error) {
      // toast.error("Error fetching doctor details");
      // console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const handlePatientAbsent = async (appointment) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const AppformData = {};
      const response = await axios.post(
        `http://localhost:9191/doctor/addPatientRecord/${appointment.tokenNo}`,
        AppformData,
        { headers: headers }
      );

      // console.log("response", response);
      if (response.status === 200) {
        toast.success("Patient marked as absent successfully");
        fetchDoctorDetails();
      } else {
        // console.error("Error marking patient absent:", response.data);
      }
    } catch (error) {
      // console.error("Error marking patient absent:", error);
    }
  };

  const handleStartConsultation = async (appointment) => {
    navigate("/doctor/consultation-form", {
      state: { 
        appToken: appointment.tokenNo,
        doctorDetails: doctorDetails.email // Pass the doctor's email to the CNForm component
      },
    });
  };
  
  // console.log("doctorDetails", doctorDetails);
  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  const sortedAppointments = [...(doctorDetails?.appointmentsList || [])].sort(
    (a, b) => a.tokenNo - b.tokenNo
  );
  const leastTokenAppointment = sortedAppointments?.[0];

  return (
    <div className="container-fluid background-table">
      <div className="container pt-5">
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          Doctor Appointments
        </h1>
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
            <tbody className="table-group-divider">
              {sortedAppointments.map((appointment) => (
                <tr key={appointment.tokenNo}>
                  <td>{appointment.tokenNo}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.reasonForVisit}</td>
                  <td>
                    {appointment.tokenNo === leastTokenAppointment.tokenNo && (
                      <div>
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 focus:outline-none hover:bg-gray-600"
                          onClick={() => handlePatientAbsent(appointment)}
                        >
                          Patient Absent
                        </button>

                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2 focus:outline-none hover:bg-green-600"
                          onClick={() => handleStartConsultation(appointment)}
                        >
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
    </div>
  );
};

export default ViewAppointments;
