import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleHome = () => {
    localStorage.getItem("role");
    if (localStorage.getItem("role") === "ADMIN") {
      navigate("/admin");
    } 
    else if (localStorage.getItem("role") === "doctor") {
      navigate("/doctor");
    }
    else if (localStorage.getItem("role") === "staff") {
      navigate("/receptionist");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <nav
      // className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      // data-bs-theme="dark"

      className="navbar navbar-expand-lg text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        {token && (
          <button
            type="button"
            class="btn btn-info bg-secondary bg-gradient btn-lg text-white"
            onClick={handleHome}
          >
            HOME
          </button>
        )}

        <div className="container d-flex justify-content-center">
          <p className="navbar-brand text-white playfair-display">
            HEALTH SYNC
          </p>
        </div>

        {token && (
          <button
            type="button"
            class="btn btn-info bg-secondary bg-gradient btn-lg text-white"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        )}
      </div>
    </nav>
  );
}
