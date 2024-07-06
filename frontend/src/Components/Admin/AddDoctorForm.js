import React, { useState } from "react";
import { ADForm } from "./ADForm";
import AddLoginCredDoc from "./AddLoginCredDoc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../assets/AdminPage.jpg";

const AddDoctorForm = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      sessionStorage.clear();
    }
  });

  const handleLoginSuccess = (email) => {
    setEmail(email);
    setLoginSuccess(true);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container">
            <img src={admin} className="admin-image" alt="adminImage" />
            <div className="dashboard-name">ADD DOCTOR</div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-20 pt-10">
          <div className="container glass-background login-cred doctor-details">
            {!loginSuccess && (
              <AddLoginCredDoc onSuccess={handleLoginSuccess} />
            )}
            {loginSuccess && <ADForm email={email} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorForm;
