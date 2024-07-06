import React, { useState } from "react";
import { ASForm } from "./ARForm";
import AddLoginCredRec from "./AddLoginCredRec";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../assets/AdminPage.jpg";

const AddStaffForm = () => {
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
            <div className="dashboard-name" style={{ fontSize: "2.2rem" }}>
              ADD RECEPTIONIST
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-20 pt-10">
          <div className="container glass-background login-cred">
            {!loginSuccess && (
              <AddLoginCredRec onSuccess={handleLoginSuccess} />
            )}
            {loginSuccess && <ASForm email={email} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaffForm;
