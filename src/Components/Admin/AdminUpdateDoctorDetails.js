import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import doctorImage from "../../assets/DoctorPage.png";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AdminUpdateDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorDetails = location.state?.doctor;
  const email = doctorDetails?.email;
  const [newSpeciality, setNewSpeciality] = useState(doctorDetails?.speciality);
  const [newMobileNo, setNewMobileNo] = useState(doctorDetails?.mobileNo);
  const [newExperience, setNewExperience] = useState(doctorDetails?.experience);
  const [newTokenMax, setNewTokenMax] = useState(doctorDetails?.tokenMax);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role === "Receptionist") {
      navigate("/");
      localStorage.clear();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = {
        email: email,
        speciality: newSpeciality,
        mobileNo: newMobileNo,
        experience: newExperience,
        tokenMax: newTokenMax,
      };
      // console.log("Form data:", formData);
      const response = await axios.post(
        "http://localhost:9191/doctor/updateDoctor",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // setSuccess(true);
      toast.success("Doctor details updated successfully!", { duration: 3000 });
      // toast.success("Doctor details updated successfully!");
      setTimeout(() => {
        navigate("/admin/view-doctor-info");
      }, 2000);
    } catch (error) {
      // console.error("Error updating doctor details:", error);
      toast.error("Error updating doctor details!", { duration: 3000 });
      // setError(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container md:block hidden">
            <img src={doctorImage} className="admin-image" alt="doctorImage" />
            <div className="dashboard-name-doctor" style={{ fontSize: "50px" }}>
              UPDATE DOCTOR
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
                  UPDATE DETAILS
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    type="email"
                    label="Email"
                    id="email"
                    value={doctorDetails.email}
                    readOnly
                    disabled
                    style={{ marginBottom: "2rem", width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="New Speciality"
                    id="newSpeciality"
                    value={newSpeciality}
                    onChange={(e) => setNewSpeciality(e.target.value)}
                    style={{ marginBottom: "2rem", width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="New Mobile No"
                    id="newMobileNo"
                    value={newMobileNo}
                    onChange={(e) => setNewMobileNo(e.target.value)}
                    style={{ marginBottom: "2rem", width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="New Experience"
                    id="newExperience"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    style={{ marginBottom: "2rem", width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    type="text"
                    label="New Token Max"
                    id="newTokenMax"
                    value={newTokenMax}
                    onChange={(e) => setNewTokenMax(e.target.value)}
                    style={{ marginBottom: "2rem", width: "100%" }}
                  />
                </div>

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
                >
                  Update DetailS
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
