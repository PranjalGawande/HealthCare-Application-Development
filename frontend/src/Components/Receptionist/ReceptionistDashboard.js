import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import receptionistImage from "../../assets/ReceptionistPage.png";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function ReceptionistDashboard() {
  const navigate = useNavigate();
  const recpName = sessionStorage.getItem("Name");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    const recpName = sessionStorage.getItem("Name");
    if (!token) {
      navigate("/");
    }
    if (role === "DOCTOR" || role === "ADMIN") {
      navigate("/");
      sessionStorage.clear();
    }

    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      toast.success(`Welcome, ${recpName}`);
      sessionStorage.removeItem("loggedIn");
    }
  });

  const determineFontSize = () => {
    if (recpName && recpName.length > 14) {
      return "2rem";
    }
    return "3rem";
  };

  return (
    <div className="main-background-doctor">
      <div className=" background h-full flex justify-center items-center ">
        <div className="flex admin-dashboard justify-evenly items-center gap-40 border-amber-300 border-solid ">
          <div className="image-container md:block hidden pl-2">
            <img
              src={receptionistImage}
              className="admin-image"
              alt="receptionistImage"
            />
            <div
              className="dashboard-name-receptionist"
              style={{ fontSize: determineFontSize() }}
            >
              {recpName}
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <NavLink
              to="/receptionist/new-patient"
              type="button"
              className="button"
              style={{
                height: "fit-content",
                fontSize: "25px",
                fontWeight: "bold",
                color: "white",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              NEW PATIENT
            </NavLink>

            <NavLink
              to="/receptionist/existing-patient-abha-search"
              type="button"
              className="button"
              style={{
                height: "fit-content",
                fontSize: "25px",
                fontWeight: "bold",
                color: "white",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              EXISTING PATIENT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
