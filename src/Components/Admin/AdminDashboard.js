import React from "react";
import { useState, useEffect } from "react";
import admin from "../../assets/AdminPage.jpg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const adminName = sessionStorage.getItem("Name");
  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      sessionStorage.clear();
    }

    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      toast.success(`Welcome, ${adminName}`, { duration: 3000 });
      sessionStorage.removeItem("loggedIn");
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
            <div
              className="dashboard-name"
              style={{
                fontSize: `calc(30px + 1vw)`,
              }}
            >
              {adminName}
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col ml-5 gap-5 pr-20">
              <NavLink
                to="/admin/add-doctor"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
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
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }}
              >
                ADD RECEPTIONIST
              </NavLink>
              <NavLink
                to="/admin/add-admin"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }}
              >
                ADD ADMIN
              </NavLink>
              <NavLink
                to="/admin/view-doctor-info"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }}
              >
                VIEW DOCTOR LIST
              </NavLink>
              <NavLink
                to="/admin/view-receptionist-info"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", 
                  textDecoration: "none", 
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }} 
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }} 
              >
                VIEW RECEPTIONIST LIST
              </NavLink>
              <NavLink
                to="/admin/view-admin-info"
                type="button"
                className="button"
                style={{
                  height: "fit-content",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "white", 
                  textDecoration: "none",
                  padding: "25px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                }}
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
