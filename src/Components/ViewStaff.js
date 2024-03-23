import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
  }, []);

  




  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:9191/admin/staffList", {
          headers: headers,
        });
        // Filter the staff list to include only receptionists
        const receptionists = response.data.filter(staff => staff.role === 'Receptionist');
        setStaff(receptionists);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setLoading(false);
      }
    };
  
    fetchStaff();
  }, []);
  
  const handleActivateDoctor = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `http://localhost:9191/admin/activateStaff/${email}`,
        null,
        { headers: headers }
      );
      // Refresh doctor list after activation
      const response = await axios.get(
        "http://localhost:9191/admin/staffList",
        {
          headers: headers,
        }
      );
      const receptionists = response.data.filter(staff => staff.role === 'Receptionist');
      setStaff(receptionists);
    } catch (error) {
      console.error("Error activating doctor:", error);
    }
  };

  const handleDeactivateDoctor = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `http://localhost:9191/admin/deactivateStaff/${email}`,
        null,
        { headers: headers }
      );
      // Refresh doctor list after deactivation
      const response = await axios.get(
        "http://localhost:9191/admin/staffList",
        {
          headers: headers,
        }
      );
      const receptionists = response.data.filter(staff => staff.role === 'Receptionist');
      setStaff(receptionists);
    } catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };
  return (
    <div>
      <h2 className="list-heading">Receptionists List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table striped bordered hover>
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
                  {staff.status ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeactivateDoctor(staff.email)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleActivateDoctor(staff.email)}
                    >
                      Activate
                    </button>
                  )}
                  {/* <button
                    className="btn btn-primary"
                    onClick={() => handleEditDoctor(doctor.id)}
                  >
                    Edit
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
    
        </Table>
       
      )}
    </div>
  );
};

export default ViewStaff;
