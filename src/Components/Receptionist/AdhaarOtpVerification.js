import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import { Progressbar } from "./Progressbar";
import { toast } from "react-hot-toast";
import API_URL from "../Config/config";

export const AdhaarOtpVerification = () => {
  const [aadhaarOtp, setAadhaarOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!aadhaarOtp.trim()) {
      toast.error("Aadhaar OTP field is empty");
      setLoading(false);
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      const formData = {
        otp: aadhaarOtp,
      };
      // console.log('FormData:', formData);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${API_URL}/receptionist/verifyAadhaarOtp`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      // console.log('Response:', response.data);
      navigate("/receptionist/abha-mobile-no");
    } catch (error) {
      toast.error("Invalid OTP, Please try again!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Progressbar step={1} />

      <div className="h-full flex justify-center items-center progPageMargin">
        <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
          <div className="image-container">
            <img
              src={patientImage}
              className="admin-image"
              alt="patientImage"
            />
            <div className="dashboard-name-patient">ABHA CREATION</div>
          </div>
          <div className="container glass-background mt-5">
            <label className="text-login fw-bold text-center">
              Enter <br /> Aadhaar OTP
            </label>
            <TextField
              id="aadhaarOtp"
              label="Aadhaar Otp"
              value={aadhaarOtp}
              onChange={(e) => setAadhaarOtp(e.target.value)}
              required
              style={{ marginBottom: "2rem", width: "50%" }}
            />
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <div class="loader"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{
                  marginTop: "2rem",
                  width: "50%",
                  height: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
