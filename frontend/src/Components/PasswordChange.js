import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import adminImage from "../assets/AdminPage.jpg";
import receptionistImage from "../assets/ReceptionistPage.png";
import doctorImage from "../assets/DoctorPage.png";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import API_URL from "../Config/config";

export const PasswordChange = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");

      if (!newPassword || newPassword.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      let endpoint = "";

      if (role === "ADMIN") {
        endpoint = `${API_URL}/admin/changePassword`; 
      } else if (role === "Receptionist") {
        endpoint = `${API_URL}/receptionist/changePassword`; 
      } else if (role === "DOCTOR") {
        endpoint = `${API_URL}/doctor/changePassword`;
      }

      const response = await axios.post(
        endpoint,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      toast.success("Password changed successfully!");
      setTimeout(() => {
        navigate(`/${role.toLowerCase()}`)
      }, 2000);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error("Error changing password!");
    }
  };




  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container md:block hidden">
            <img
              src={
                role === "DOCTOR"
                  ? doctorImage
                  : role === "Receptionist"
                    ? receptionistImage
                    : adminImage
              }
              className="admin-image"
              alt="changePasswordImage"
            />
            <div className={
              role === "DOCTOR"
                ? "dashboard-name-doctor"
                : role === "Receptionist"
                  ? "dashboard-name-receptionist"
                  : "dashboard-name"
            } style={{ fontSize: "xx-large" }}>
              CHANGE PASSWORD
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-20 pt-10">
          <div className="container glass-background login-cred">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "2rem",
              }}
            >
              <div className="flex">
                <label className="text-login fw-bold text-center ">
                  CHANGE <br></br> PASSWORD <br></br> <br></br>
                </label>
              </div>
              <form onSubmit={handleChangePassword}>
                <div>
                  <TextField
                    type="password"
                    label="Old Password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{ marginBottom: "2rem", width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    label="New Password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ marginBottom: "2rem", width: "100%" }}
                  />
                </div>
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
