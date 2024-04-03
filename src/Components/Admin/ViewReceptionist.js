import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

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
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9191/admin/staffList",
          {
            headers: headers,
          }
        );
        const receptionists = response.data.filter(
          (staff) => staff.role === "Receptionist"
        );
        setStaff(receptionists);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleViewStaffDetails = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const formData = { email: email };
      const response = await axios.post(
        "http://localhost:9191/receptionist/receptionistDetails",
        formData,
        { headers: headers }
      );
      const staffDetails = response.data;
      console.log("viewform: ",staffDetails);
      navigate("/admin/view-receptionist-details", {
        state: { staff: staffDetails },
      });
    } catch (error) {
      console.error("Error viewing staff details:", error);
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
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
                <td>
                  {
                    <button
                      type="button"
                      className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-cyan-400 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
                      onClick={() => handleViewStaffDetails(staff.email)}
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

export default ViewStaff;
