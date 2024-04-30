import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginPage.jpg";
import toast from "react-hot-toast";
import API_URL from "../Config/config";

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // headers.set("ngrok-skip-browser-warning", true);
  // make header changes
  // const headers: { "ngrok-skip-browser-warning": `true` }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const lowercaseRole = role.toLowerCase();
      const response = await axios.post(
        `${API_URL}/login/${lowercaseRole}`,
        {
          email: email,
          password: password,
        },
        {
          headers: { "ngrok-skip-browser-warning": `true` },
        }
      );
      const responseData = response.data;
      const token = responseData.token;
      // console.log("User Logged In:", responseData);

      sessionStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("loggedIn", "true");

      let DetailsResponse;
      if (role === "ADMIN") {
        DetailsResponse = await axios.get(
          `${API_URL}/admin/adminDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
      } else if (role === "DOCTOR") {
        const formData = {};

        DetailsResponse = await axios.post(
          `${API_URL}/doctor/doctorDetails`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
      } else if (role === "Receptionist") {
        const formData = {};

        DetailsResponse = await axios.post(
          `${API_URL}/receptionist/receptionistDetails`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
      }
      const Name = DetailsResponse.data.name;
      // console.log("Data:", DetailsResponse.data);
      // console.log("Name:", Name);

      localStorage.setItem("Name", Name);

      if (role === "DOCTOR") {
        navigate("/doctor");
      } else if (role === "Receptionist") {
        navigate("/receptionist");
      } else if (role === "ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      // console.error("Login failed:", error);
      toast.error("Incorrect credentials.", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="container-fluid main-background">
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
              <div>
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "2rem", width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
              </div>
              <br></br>
              <div className="flex justify-center">
                {" "}
                {/* Add flex properties to center the button */}
                {loading ? (
                  <div
                    style={{
                      height: "20%",
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
                    className="button"
                    style={{
                      height: "fit-content",
                      padding: "20px",
                      color: "white", // Set default font color to white
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "black";
                    }} // Change font color to black on hover
                    onMouseLeave={(e) => {
                      e.target.style.color = "white";
                    }} // Change font color back to white when not hovered
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
