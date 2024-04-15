import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useState } from "react";

export default function Navbar() {
  let navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleHome = () => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "DOCTOR") {
      navigate("/doctor");
    } else if (role === "Receptionist") {
      navigate("/receptionist");
    }
  };

  const handleAnalytics = () => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
      navigate("/admin/analytics");
    }
  };

  let DetailsResponse;
  const handleViewDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (role === "ADMIN") {
        DetailsResponse = await axios.get("http://localhost:9191/admin/adminDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        });
        navigate("/admin/admin-details", { state: { adminDetails: DetailsResponse.data } });

      }
      else if (role === "DOCTOR") {
        const formData = {};

        DetailsResponse = await axios.post("http://localhost:9191/doctor/doctorDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }

          });
        navigate("/admin/view-doctor-details", { state: { doctor: DetailsResponse.data } });


      }
      else if (role === "Receptionist") {
        const formData = {};

        DetailsResponse = await axios.post("http://localhost:9191/receptionist/receptionistDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }

          });
        navigate("/admin/view-receptionist-details", { state: { staff: DetailsResponse.data } });
      }

    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  const paddingleft = (role === "Receptionist" || role === "DOCTOR") ? "8rem" : "0";

  const token = localStorage.getItem("token");

  return (
    <nav
      className="container-fluid navbar navbar-expand-lg text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        {token && (
          <button
            type="button"
            className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
            onClick={handleHome}
          >
            HOME
          </button>
        )}


        {token && role === "ADMIN" && (
          <button
            type="button"
            className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white ml-4"
            onClick={handleAnalytics}
          >
            ANALYTICS
          </button>
        )}

        <div className="container d-flex justify-content-center">
          <p className="navbar-brand text-white playfair-display"
          style={{ fontSize: "2.5rem", paddingLeft: paddingleft}}
          >
            HEALTH SYNC
          </p>
        </div>

        {token && (
          <button
            type="button"
            className="profile-btn btn btn-lg text-white"
            onClick={handleViewDetails}
          >
            <CgProfile />
          </button>
        )}

        {token && (
          <button
            type="button"
            className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        )}
      </div>
    </nav>
  );
}







