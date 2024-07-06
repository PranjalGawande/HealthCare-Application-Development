import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctorImage from "../../assets/DoctorPage.png";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function DoctorDashboard() {
  const doctorName = sessionStorage.getItem("Name");
  const navigate = useNavigate();

  const determineFontSize = () => {
    if (doctorName && doctorName.length > 14) {
      return "2rem";
    }
    return "3rem";
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "DOCTOR") {
      navigate("/");
      sessionStorage.clear();
    }

    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      toast.success(`Welcome, ${doctorName}`);
      sessionStorage.removeItem("loggedIn");
    }
  }, [navigate, doctorName]);

  return (
    <div className="main-background-doctor">
      <div className=" background h-full flex justify-center items-center ">
        <div className="flex admin-dashboard justify-evenly items-center gap-40 border-amber-300 border-solid ">
          <div className="image-container md:block hidden pl-2">
            <img src={doctorImage} className="admin-image" alt="doctorImage" />
            <div
              className="dashboard-name-doctor"
              style={{ fontSize: determineFontSize() }}
            >
              {doctorName}
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <NavLink
              to="/doctor/view-appointments"
              type="button"
              className="button"
              style={{
                height: "fit-content",
                fontSize: "25px",
                fontWeight: "bold",
                color: "white",
                textDecoration: "none",
                padding: "30px",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              VIEW APPOINTMENTS
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
