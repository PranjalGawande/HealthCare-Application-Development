import React from "react";
import { useState, useEffect } from "react";
import admin from "../../assets/AdminPage.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const adminName = localStorage.getItem("Name");
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      localStorage.clear();
    }

    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      toast.success(`Welcome, ${adminName}`, { duration: 3000 });
      localStorage.removeItem("loggedIn");
    }
  }, []);

  const determineFontSize = () => {
    if (adminName && adminName.length > 14) {
      return "2rem";
    }
    return "3rem";
  };
  return (
    <div>
      <div className="h-full flex flex-row justify-center items-center">
        <div className="container flex flex-nowrap admin-dashboard justify-between items-center  border-amber-300 border-solid ">
          <div className="image-container md:block hidden pl-2">
            <img src={admin} className="admin-image" alt="adminImage" />
            {/* <div
              className="dashboard-name"
              style={{ fontSize: determineFontSize() }}
            >
              {adminName}
            </div> */}

            <div
              className="dashboard-name"
              style={{
                fontSize: `calc(30px + 1vw)`, // Adjust the formula as needed
              }}
            >
              {adminName}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col ml-5 gap-5 pr-20">
              <NavLink
                to="/admin/add-doctor"
                // className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", // Set default font color to white
                  textDecoration: "none", // Remove default underline
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }}
              >
                ADD DOCTOR
              </NavLink>
              <NavLink
                to="/admin/add-staff"
                // className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", // Set default font color to white
                  textDecoration: "none", // Remove default underline
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }} // Change font color to black on hover
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }} // Change font color back to white when not hovered
              >
                ADD RECEPTIONIST
              </NavLink>
              <NavLink
                to="/admin/add-admin"
                // className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", // Set default font color to white
                  textDecoration: "none", // Remove default underline
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }} // Change font color to black on hover
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }} // Change font color back to white when not hovered
              >
                ADD ADMIN
              </NavLink>
              <NavLink
                to="/admin/view-doctor-info"
                // className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", // Set default font color to white
                  textDecoration: "none", // Remove default underline
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }} // Change font color to black on hover
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }} // Change font color back to white when not hovered
              >
                VIEW DOCTOR LIST
              </NavLink>
              <NavLink
                to="/admin/view-receptionist-info"
                // className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", // Set default font color to white
                  textDecoration: "none", // Remove default underline
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }} // Change font color to black on hover
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }} // Change font color back to white when not hovered
              >
                VIEW RECEPTIONIST LIST
              </NavLink>
              <NavLink
                to="/admin/view-admin-info"
                // className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", // Set default font color to white
                  textDecoration: "none", // Remove default underline
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }} // Change font color to black on hover
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }} // Change font color back to white when not hovered
              >
                VIEW ADMIN LIST
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
