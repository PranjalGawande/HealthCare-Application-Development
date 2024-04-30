import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Config/config";
import toast from "react-hot-toast";

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

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
      "ngrok-skip-browser-warning": "true",
    };
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/admin/staffList`,
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
        toast.error("Error fetching Receptionists:");
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleViewStaffDetails = async (email) => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      };
      const formData = { email: email };
      const response = await axios.post(
        `${API_URL}/receptionist/receptionistDetails`,
        formData,
        { headers: headers }
      );
      const staffDetails = response.data;
      navigate("/admin/view-receptionist-details", {
        state: { staff: staffDetails },
      });
    } catch (error) {
      console.error("Error viewing staff details:", error);
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
          RECEPTIONISTS LIST
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
    </div>
  );
};

export default ViewStaff;
