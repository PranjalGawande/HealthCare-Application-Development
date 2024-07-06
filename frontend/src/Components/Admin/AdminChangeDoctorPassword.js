import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import doctorImage from "../../assets/DoctorPage.png";
import toast from "react-hot-toast";
import API_URL from "../../Config/config";

export const AdminChangeDoctorPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const doctor = location.state?.doctor;
  const email = doctor?.email;
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role === "Receptionist") {
      navigate("/");
      sessionStorage.clear();
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    const token = sessionStorage.getItem("token");
    const formData = {
      email: email,
      newPassword: newPassword,
    };

    try {
      const response = await axios.post(
        `${API_URL}/doctor/changePassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      toast.success("Doctor Password updated successfully!", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Doctor Password updation failed!", { duration: 3000 });
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container md:block hidden">
            <img src={doctorImage} className="admin-image" alt="doctorImage" />
            <div
              className="dashboard-name-doctor"
              style={{ fontSize: "xx-large" }}
            >
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
                    id="newPassword"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
