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
      navigate("/password-change");
    } catch (error) {
      console.error("Error changing password:", error);
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
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col md:flex-row admin-dashboard justify-evenly items-center border-amber-300 border-solid ">
        <div className="image-container md:block hidden">
          <img src={admin} className="admin-image" alt="adminImage" />
          <div
            className="dashboard-name"
            style={{ fontSize: determineFontSize() }}
          >
            {adminDetails.name}
          </div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">Profile Details</label>
          {adminDetails && (


            <div className="flex flex-col text-2xl">
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Name:
                </span>
                <span className="flex justify-start">
                  {adminDetails.name}
                </span>
              </div>

              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  DOB:
                </span>
                <span className="flex justify-start">
                  {new Date(adminDetails.dob).toLocaleDateString()}
                </span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Mobile:
                </span>
                <span className="flex justify-start">
                  {adminDetails.mobileNo}
                </span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Gender:
                </span>
                <span className="flex justify-start">
                  {adminDetails.gender}
                </span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Email:
                </span>
                <span className="flex justify-start">
                  {adminDetails.email}
                </span>
              </div>


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
