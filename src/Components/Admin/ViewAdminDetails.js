import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import admin from "../../assets/AdminPage.jpg";

export const ViewAdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      navigate("/admin/admin-password-change");
    } catch (error) {
      console.error("Error changing password:", error);
    }

    navigate("/admin/admin-password-change");
  };

  const handleUpdateDetails = async () => {
    try {
      navigate("/admin/admin-update", { state: { admin: adminDetails } });
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log("token: ", token);
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      localStorage.clear();
    }

    console.log("location.state: ", location.state);
    if (location.state && location.state.adminDetails) {
      setAdminDetails(location.state.adminDetails);
    } else {
      navigate("/error");
    }
  }, [location.state, navigate]);

  const determineFontSize = () => {
    if (adminDetails.name && adminDetails.name.length > 14) {
      return "2rem";
    }
    return "3rem";
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={admin} className="admin-image" />
          <div
            className="dashboard-name"
            style={{ fontSize: determineFontSize() }}
          >
            {adminDetails.name}
          </div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Profile Details
          </label>
          {adminDetails && (
            <div className="flex flex-col text-2xl">
              <p className="mb-2 font-bold">
                Name:<span className="font-normal"> {adminDetails.name}</span>
              </p>
              <p className="mb-2 font-bold">
                Date of Birth:{" "}
                <span className="font-normal">
                  {new Date(adminDetails.dob).toLocaleDateString()}
                </span>
              </p>
              <p className="mb-2 font-bold">
                Mobile No:{" "}
                <span className="font-normal">{adminDetails.mobileNo}</span>
              </p>
              <p className="mb-2 font-bold">
                Gender:{" "}
                <span className="font-normal">{adminDetails.gender}</span>
              </p>
              <p className="mb-2 font-bold">
                Email: <span className="font-normal">{adminDetails.email}</span>
              </p>
              <br />
              <div className="mt-3">
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
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
