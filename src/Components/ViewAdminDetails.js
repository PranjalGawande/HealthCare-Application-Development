import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ViewAdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch admin details if not received from props
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:9191/admin/adminDetails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminDetails(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    // Check if admin details are received as props
    // If not, fetch them using the handler
    if (!adminDetails) {
      fetchAdminDetails();
    }
  }, [adminDetails]); // Re-fetch admin details if adminDetails state changes

  return (
    <div className="container glass-background mt-5">
      <label className="text-login fw-bold text-center">
            ADMIN DETAILS
          </label>
      {adminDetails && (
        <div>
          <p className="mb-2">Name: {adminDetails.name}</p>
          <p className="mb-2">Date of Birth: {new Date(adminDetails.dob).toLocaleDateString()}</p>
          <p className="mb-2">Mobile No: {adminDetails.mobileNo}</p>
          <p className="mb-2">Gender: {adminDetails.gender}</p>
          <p className="mb-2">Abha ID: {adminDetails.abhaId}</p>
          <p className="mb-2">Email: {adminDetails.email}</p>
        </div>
      )}
    </div>
  );
};
