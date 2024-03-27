import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

export const ViewAdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.adminDetails) {
      setAdminDetails(location.state.adminDetails);
    } else {
      // Handle the case where doctor details are not available
      navigate('/error'); // Redirect to error page or handle accordingly
    }
  }, [location.state, navigate]); // Re-fetch admin details if adminDetails state changes

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
