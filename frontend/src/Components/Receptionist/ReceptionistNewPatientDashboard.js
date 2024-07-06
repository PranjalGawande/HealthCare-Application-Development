import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import receptionistImage from "../../assets/ReceptionistPage.png";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function ReceptionistNewPatientDashboard() {
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
          <div className="image-container">
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
              to="/receptionist/adhaar-abha-id-creation"
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
              CREATE ABHA ID
            </NavLink>
            <NavLink
              to="/receptionist/abha-verification"
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
              VERIFY ABHA ID
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
