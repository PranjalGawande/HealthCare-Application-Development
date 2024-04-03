import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import admin from "../../assets/AdminPage.jpg";
import TextField from "@mui/material/TextField";

export const AdminPasswordChange = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9191/admin/changePassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container">
            <img src={admin} className="admin-image" />
            <div className="dashboard-name" style={{ fontSize: "xx-large" }}>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && (
                  <p style={{ color: "green" }}>
                    Password changed successfully!
                  </p>
                )}
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
