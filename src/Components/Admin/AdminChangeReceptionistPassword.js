import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import receptionistImage from "../../assets/ReceptionistPage.png";
import toast from "react-hot-toast";


export const AdminChangeReceptionistPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const staff = location.state?.staff;
  const email = staff?.email;
  const [newPassword, setNewPassword] = useState("");
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);

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
    if (!newPassword || newPassword.length < 6) {
      console.error("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const formData = {
        email: email,
        newPassword: newPassword,
      };
      console.log("formdata", formData);
      const response = await axios.post(
        "http://localhost:9191/receptionist/changePassword",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // setSuccess(true);
      toast.success("Receptionist Password updated successfully!", { duration: 3000 });

    } catch (error) {
      toast.error("Error updating password!", { duration: 3000 });
      // setError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container">
            <img src={receptionistImage} className="admin-image" />
            <div
              className="dashboard-name-receptionist"
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
                {/* {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                {success && (
                  <p style={{ color: "green" }}>
                    Password changed successfully!
                  </p>
                )}{" "} */}
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
