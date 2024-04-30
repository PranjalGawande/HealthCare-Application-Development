import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "../assets/HADLogo.png";

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
        DetailsResponse = await axios.get(
          "http://localhost:9191/admin/adminDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/admin/admin-details", {
          state: { adminDetails: DetailsResponse.data },
        });
      } else if (role === "DOCTOR") {
        const formData = {};

        DetailsResponse = await axios.post(
          "http://localhost:9191/doctor/doctorDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/admin/view-doctor-details", {
          state: { doctor: DetailsResponse.data },
        });
      } else if (role === "Receptionist") {
        const formData = {};

        DetailsResponse = await axios.post(
          "http://localhost:9191/receptionist/receptionistDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/admin/view-receptionist-details", {
          state: { staff: DetailsResponse.data },
        });
      }
    } catch (error) {
      toast.error("Error fetching details");
      // console.error("Error fetching admin details:", error);
    }
  };

  const handleResetAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const formData = {};

      if (role === "Receptionist") {
        await axios.post(
          "http://localhost:9191/receptionist/resetAppointment",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Appointments reset successfully");
      }
    } catch (error) {
      toast.error("Error resetting appointments");
      // console.error("Error resetting appointments:", error);
    }
  };

  let paddingleft;
  if (role === "Receptionist") {
    paddingleft = "3rem";
  } else if (role === "DOCTOR") {
    paddingleft = "10rem";
  }

  // const paddingleft =
  //   role === "Receptionist" ? "2rem" : "0" || role === "DOCTOR" ? "0" : "0";

  const token = localStorage.getItem("token");

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

          <div className="container d-flex justify-content-center align-items-center" style={{paddingLeft: paddingleft}}>
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
