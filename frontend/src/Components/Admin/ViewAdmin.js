import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Config/config";

const ViewAdmin = () => {
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
  }, [navigate]);

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
        const admins = response.data.filter((staff) => staff.role === "ADMIN");
        setStaff(admins);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

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
          ADMINS LIST
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{width: "33%"}}>Name</th>
                <th scope="col" style={{width: "33%"}}>E-mail</th>
                <th scope="col" style={{width: "33%"}}>Role</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staff) => (
                <tr>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewAdmin;
