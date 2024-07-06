import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "../assets/HADLogo.png";
import API_URL from "../Config/config";

export default function Navbar() {
  let navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleHome = () => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "DOCTOR") {
      navigate("/doctor");
    } else if (role === "Receptionist") {
      navigate("/receptionist");
    }
  };

  const handleAnalytics = () => {
    if (role === "ADMIN") {
      navigate("/admin/analytics");
    }
  };

  const handleLogs = () => {
    if (role === "ADMIN") {
      navigate("/admin/access-logs");
    }
  };

  let DetailsResponse;
  const handleViewDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");

      if (role === "ADMIN") {
        DetailsResponse = await axios.get(
          `${API_URL}/admin/adminDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
        navigate("/admin/admin-details", {
          state: { adminDetails: DetailsResponse.data },
        });
      } else if (role === "DOCTOR") {
        const formData = {};

        DetailsResponse = await axios.post(
          `${API_URL}/doctor/doctorDetails`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
        navigate("/admin/view-doctor-details", {
          state: { doctor: DetailsResponse.data },
        });
      } else if (role === "Receptionist") {
        const formData = {};

        DetailsResponse = await axios.post(
          `${API_URL}/receptionist/receptionistDetails`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
        navigate("/admin/view-receptionist-details", {
          state: { staff: DetailsResponse.data },
        });
      }
    } catch (error) {
      toast.error("Error fetching details");
    }
  };

  const handleResetAppointments = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");
      const formData = {};

      if (role === "Receptionist") {
        await axios.post(
          `${API_URL}/receptionist/resetAppointment`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
        toast.success("Appointments reset successfully");
      }
    } catch (error) {
      toast.error("Error resetting appointments");
    }
  };

  let paddingleft;
  if (role === "Receptionist") {
    paddingleft = "3rem";
  } else if (role === "DOCTOR") {
    paddingleft = "10rem";
  }
  
  const token = sessionStorage.getItem("token");

  return (
    <div className="flex ">
      <nav
        className="flex flex-wrap container-fluid navbar navbar-expand-lg text-white "
        data-bs-theme="dark"
      >
        <div className="flex flex-nowrap container-fluid">
          {token && (
            <button
              type="button"
              className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
              onClick={handleHome}
            >
              HOME
            </button>
          )}

          {role === "Receptionist" && (
            <button
              type="button"
              className="ml-5 navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
              onClick={handleResetAppointments}
            >
              RESET
            </button>
          )}

          {token && role === "ADMIN" && (
            <button
              type="button"
              className="flex navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white ml-4"
              onClick={handleAnalytics}
            >
              ANALYTICS
            </button>
          )}

          {token && role === "ADMIN" && (
            <button
              type="button"
              className="flex navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white ml-4"
              onClick={handleLogs}
            >
              LOGS
            </button>
          )}

          <div className="container d-flex justify-content-center align-items-center" style={{ paddingLeft: paddingleft }}>
            <img src={Logo} alt="logo" width={"70px"} className="mr-3"

            />
            <p
              className="navbar-brand text-white playfair-display fw-bold"
              style={{ fontSize: "2.5rem" }}
            >
              HEALTH SYNC
            </p>
          </div>



          {token && (
            <button
              type="button"
              className="mr-5 profile-btn btn btn-lg text-white"
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
    </div>
  );
}
