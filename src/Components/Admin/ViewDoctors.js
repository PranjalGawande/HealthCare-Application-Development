import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9191/receptionist/doctorList",
          {
            headers: headers,
          }
        );
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewDoctorDetails = async (email) => {
    try {
      const token2 = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token2}`,
      };
      const formData = { email: email };

      const response = await axios.post(
        "http://localhost:9191/doctor/doctorDetails",
        formData,
        { headers: headers }
      );

      const doctorDetails = response.data;
      navigate("/admin/view-doctor-details", {
        state: { doctor: doctorDetails },
      });
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  return (
    <div className="container mt-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table
          className="table table-hover"
          cellpadding="0"
          cellspacing="0"
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
  );
};

export default ViewDoctors;
