import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Config/config";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      sessionStorage.clear();
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    };
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/receptionist/doctorList`,
          {
            headers: headers,
          }
        );
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewDoctorDetails = async (email) => {
    try {
      const token2 = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token2}`,
        'ngrok-skip-browser-warning': 'true',
      };
      const formData = { email: email };

      const response = await axios.post(
        `${API_URL}/doctor/doctorDetails`, 
        formData,
        { headers: headers }
      );

      const doctorDetails = response.data;
      navigate("/admin/view-doctor-details", {
        state: { doctor: doctorDetails },
      });
    } catch (error) {
    }
  };

  return (
    <div className="background-table">
      <div className="container pt-5">
        <h2
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          DOCTORS LIST
        </h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table
            className="table table-hover"
            cellPadding="0"
            cellSpacing="0"
            border="0"
          >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">E-mail</th>
                <th scope="col">Speciality</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.speciality}</td>
                  <td>
                    {
                      <button
                        type="button"
                        className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-cyan-400 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
                        onClick={() => handleViewDoctorDetails(doctor.email)}
                      >
                        View Details
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewDoctors;
