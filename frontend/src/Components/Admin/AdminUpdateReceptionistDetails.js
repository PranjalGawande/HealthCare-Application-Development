import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import receptionistImage from "../../assets/ReceptionistPage.png";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from "../../Config/config";

export const AdminUpdateReceptionistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const staffDetails = location.state?.staff;
  const email = staffDetails?.email;
  const [newMobileNo, setNewMobileNo] = useState(staffDetails?.mobileNo);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role === "DOCTOR") {
      navigate("/");
      sessionStorage.clear();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMobileNo || newMobileNo.length < 10) {
      toast.error("Mobile number must be at least 10 characters long");
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const formData = {
        email: email,
        mobileNo: newMobileNo,
      };
      const response = await axios.post(
        `${API_URL}/receptionist/updateReceptionist`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      toast.success("Receptionist details updated successfully!", {
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/admin/view-receptionist-info");
      }, 2000);
    } catch (error) {
      toast.error("Error updating receptionist details!", { duration: 3000 });
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container md:block hidden">
            <img
              src={receptionistImage}
              className="admin-image"
              alt="receptionistImage"
            />
            <div
              className="dashboard-name-receptionist"
              style={{ fontSize: "xx-large" }}
            >
              UPDATE RECEPTIONIST
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
                <label className="text-login fw-bold text-center  mb-5">
                  Update Details
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    type="email"
                    label="Email"
                    id="email"
                    size="large"
                    style={{ width: "100%", marginBottom: "2rem" }}
                    value={staffDetails.email}
                    readOnly
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="New Mobile No"
                    id="newMobileNo"
                    size="large"
                    style={{ width: "100%", marginBottom: "2rem" }}
                    value={newMobileNo}
                    onChange={(e) => setNewMobileNo(e.target.value)}
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
                  Update Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
