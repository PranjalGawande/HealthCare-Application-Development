import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import recepImage from "../../assets/ReceptionistPage.png";
import toast from "react-hot-toast";
import API_URL from "../../Config/config";

export const ViewReceptionistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffDetails, setStaffDetails] = useState("");
  const role = sessionStorage.getItem("role");

  const handleUpdateDetails = () => {
    navigate("/admin/admin-receptionist-details-update", {
      state: { staff: staffDetails },
    });
  };

  const handleChangePassword = () => {
    if (role === "Receptionist") {
      navigate("/password-change");
    } else {
      navigate("/admin/admin-receptionist-password-change");
    }
  };

  const handleActivateDoctor = async (email) => {
    try {
      if (!staffDetails || !staffDetails.email) {
        return;
      }
      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      };

      const formData = { email: email };
      const response = await axios.post(
        `${API_URL}/admin/activateStaff`,
        formData,
        { headers: headers }
      );
      setStaffDetails((prevStaffDetails) => ({
        ...prevStaffDetails,
        status: true,
      }));
      toast.success("Receptionist activated successfully");
    } catch (error) {}
  };

  const handleDeactivateDoctor = async (email) => {
    try {
      if (!staffDetails || !staffDetails.email) {
        return;
      }

      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      };

      const formData = { email: email };
      const response = await axios.post(
        `${API_URL}/admin/deActivateStaff`,
        formData,
        { headers: headers }
      );
      setStaffDetails((prevStaffDetails) => ({
        ...prevStaffDetails,
        status: false,
      }));
      toast.success("Receptionist deactivated successfully");
    } catch (error) {}
  };

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
    if (location.state && location.state.staff) {
      setStaffDetails(location.state.staff);
    } else {
      navigate("/error");
    }
  }, [location.state, navigate]);

  const determineFontSize = () => {
    if (staffDetails.name && staffDetails.name.length > 14) {
      return "2rem";
    }
    return "3rem";
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex flex-col md:flex-row admin-dashboard justify-evenly items-center border-amber-300 border-solid">
        <div className="image-container md:block hidden">
          <img src={recepImage} className="admin-image" alt="recepImage" />
          <div
            className="dashboard-name-receptionist"
            style={{ fontSize: determineFontSize() }}
          >
            {staffDetails.name}
          </div>
        </div>
        <div className="container doctor-details mt-5">
          <label className="text-login profile-details fw-bold text-center mt-5 mb-1">
            Profile Details
          </label>
          {staffDetails && (
            <div className="flex flex-col text-2xl">
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Name:
                </span>
                <span className="flex justify-start">{staffDetails.name}</span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  DOB:
                </span>
                <span className="flex justify-start">
                  {new Date(staffDetails.dob).toLocaleDateString()}
                </span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Mobile:
                </span>
                <span className="flex justify-start">
                  {staffDetails.mobileNo}
                </span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Gender:
                </span>
                <span className="flex justify-start">
                  {staffDetails.gender}
                </span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Email:
                </span>
                <span className="flex justify-start">{staffDetails.email}</span>
              </div>
              <div className="flex mb-2 justify-start">
                <span className="w-32 font-semibold flex justify-start">
                  Status:
                </span>
                <span
                  className={`flex justify-start ${
                    staffDetails.status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {staffDetails.status ? "Active" : "Inactive"}
                </span>
              </div>
              <br />
              <div className="mt-3">
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleUpdateDetails}
                >
                  Update Details
                </button>
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
                {role !== "Receptionist" && (
                  <>
                    {staffDetails.status === true ? (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{
                          marginBottom: "2rem",
                          marginTop: "2rem",
                          width: "100%",
                          height: "10%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() =>
                          handleDeactivateDoctor(staffDetails.email)
                        }
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{
                          marginBottom: "2rem",
                          marginTop: "2rem",
                          width: "100%",
                          height: "10%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => handleActivateDoctor(staffDetails.email)}
                      >
                        Activate
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
