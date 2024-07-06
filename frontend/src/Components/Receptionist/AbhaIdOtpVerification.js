import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import { Progressbar } from "./Progressbar";
import { toast } from "react-hot-toast";
import API_URL from "../../Config/config";

export const AbhaIdOtpVerification = () => {
  const [abdmOtp, setAbdmOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    mobileNo: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    abhaId: "",
  });

  const fetchTransactionId = async () => {
    const token = sessionStorage.getItem("token");
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${API_URL}/getTransactionId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
    );
      const transId = response.data.transactionId;
      return transId;
    } catch (error) {
      console.error("Error fetching transaction ID:", error);
      throw error;
    }
  };

  const fetchPatientData = async () => {
    try {
      const abhaAdd = sessionStorage.getItem("abhaAddress");
      const token = sessionStorage.getItem("token");
      const formData = {
        abhaId: abhaAdd,
      };
      // console.log("FormData:", formData);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${API_URL}/receptionist/patientDetails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const patientData = response.data;
      // console.log("Patient Data:", patientData);

      return patientData;
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!abdmOtp.trim()) {
      toast.error("Abha Address field is empty");
      setLoading(false);
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      let transactionIdAttempt = 0;
      let transactionId = "";

      while (!transactionId && transactionIdAttempt < 5) {
        try {
          transactionId = await fetchTransactionId();
        } catch (error) {
          console.error("Error fetching transaction ID:", error);
        }
        transactionIdAttempt++;
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      if (!transactionId) {
        setLoading(false);
        toast.error("Unable to fetch transaction ID after multiple attempts.");
        throw new Error(
          "Unable to fetch transaction ID after multiple attempts."
        );
      }

      const formData = {
        txnId: transactionId,
        otp: abdmOtp,
      };
      // console.log("FormData:", formData);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${API_URL}/receptionist/verificationAbhaAddressOtp`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      // console.log("Response:", response.data);
    } catch (error) {
      toast.error("Invalid OTP, Please try again!");
      console.error("Error:", error);
      return;
    } finally {
      // setLoading(false);
    }

    try {
      let fetchPatientAttempt = 0;
      let response = "";

      while (!response && fetchPatientAttempt < 5) {
        try {
          response = await fetchPatientData();
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
        fetchPatientAttempt++;
        await new Promise((resolve) => setTimeout(resolve, 6000));
      }

      if (!response) {
        setLoading(false);
        toast.error("Unable to fetch patient data after multiple attempts.");
        throw new Error(
          "Unable to fetch patient data after multiple attempts."
        );
      } else {
        navigate("/receptionist/add-patient", {
          state: { patientInfo: response },
        });
      }
    } catch (error) {
      console.error("Error Submitting:", error);
    }
  };

  return (
    <div>
      <Progressbar step={2} />
      <div className="h-full flex justify-center items-center progPageMargin">
        <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
          <div className="image-container">
            <img
              src={patientImage}
              className="admin-image"
              alt="patientImage"
            />
            <div className="dashboard-name-patient">ABHA VRIFICATION</div>
          </div>
          <div className="container glass-background mt-5">
            <label className="text-login fw-bold text-center">
              Enter <br /> OTP
            </label>
            <TextField
              id="abdmOtp"
              label="Abdm Otp"
              value={abdmOtp}
              onChange={(e) => setAbdmOtp(e.target.value)}
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
                <div className="loader"></div>
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
