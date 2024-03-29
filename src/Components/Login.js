import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import loginImage from "../assets/loginPage.jpg";
import { colors } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = uuidv4();
      const lowercaseRole = role.toLowerCase();
      const response = await axios.post(
        `http://localhost:9191/login/${lowercaseRole}`,
        {
          email: email,
          password: password,
        }
      );
      const responseData = response.data; // Accessing the data returned by the backend
      const token = responseData.token; // Assuming the backend returns a token
      // const name = responseData.name;
      console.log("User Logged In:", responseData);

      // localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("loggedIn", "true");
      // console.log("User Logged In:", responseData);
      // localStorage.setItem("token", token);
      // localStorage.setItem("role", role);
      // console.log("User Logged In:", response.data);

      let DetailsResponse;
      if (role === "ADMIN") {
        DetailsResponse = await axios.get(
          "http://localhost:9191/admin/adminDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role === "DOCTOR") {
        const formData = {};

        DetailsResponse = await axios.post(
          "http://localhost:9191/doctor/doctorDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role === "Receptionist") {
        const formData = {};

        DetailsResponse = await axios.post(
          "http://localhost:9191/receptionist/receptionistDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // const formData = {};

      // const DetailsResponse = await axios.post(DetailsEndpoint,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     }

      //   });

      // Extract admin name from the response
      const Name = DetailsResponse.data.name;
      console.log("Name:", Name);

      // Store admin name in local storage or state for later use
      localStorage.setItem("Name", Name);

      // toast.success("Login Successful");

      if (role === "DOCTOR") {
        navigate("/doctor");
      } else if (role === "Receptionist") {
        navigate("/receptionist");
      } else if (role === "ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const notify = () => toast("Here is your toast.");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="container-fluid main-background">
      {/* // <div className="background" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}> */}
      <div className="container background d-flex align-items-center">
        <div className="login-image">
          <img src={loginImage} alt="login" />
        </div>
        <div className="container glass-background">
          <label className="text-login fw-bold text-center">
            LOGIN DETAILS
          </label>
          <div className="login-form mx-5">
            <form className="" onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                size="medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: "2rem", width: "100%" }}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                size="medium"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: "2rem", width: "100%" }}
              />
              <TextField
                id="role"
                select
                label="Role"
                variant="outlined"
                size="medium"
                value={role}
                onChange={handleRoleChange}
                style={{ marginBottom: "2rem", width: "100%" }}
              >
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="Receptionist">Receptionist</MenuItem>
                <MenuItem value="DOCTOR">Doctor</MenuItem>
              </TextField>
              <button
                type="submit"
                className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
