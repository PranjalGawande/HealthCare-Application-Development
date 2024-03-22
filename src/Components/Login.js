// import React, { useState } from "react";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("User Logged In:", { email, password, role });
//   };

//   const handleRoleChange = (e) => {
//     setRole(e.target.value);
//   };

//   return (
//     // <div className="container background d-flex align-items-center">
//     //   <div className="container glass-background ">
//     //     <label className="text-login fw-bold text-center">LOGIN</label>

//     //     <form>
//     //       <div className="mb-3 mt-5 mx-5">
//     //         <p htmlFor="exampleInputEmail1" className="form-label text-start">
//     //           Email
//     //         </p>
//     //         <input
//     //           type="email"
//     //           className="form-control"
//     //           id="exampleInputEmail1"
//     //           aria-describedby="emailHelp"
//     //         />
//     //       </div>
//     //       <div className="mb-3 mt-5 mx-5">
//     //         <p htmlFor="exampleInputPassword1" className="form-label text-start">
//     //           Password
//     //         </p>
//     //         <input
//     //           type="password"
//     //           className="form-control"
//     //           id="exampleInputPassword1"
//     //         />
//     //       </div>
//     //       <div className="mb-3 mt-5 mx-5">
//     //         <p htmlFor="exampleInputPassword1" className="form-label text-start">
//     //           Role
//     //         </p>
//     //         <select
//     //           className="form-select"
//     //           aria-label="Default select example"
//     //           onChange={handleRoleChange}
//     //         >
//     //           <option value="admin">Admin</option>
//     //           <option value="doctor">Doctor</option>
//     //           <option value="receptionist">Receptionist</option>
//     //         </select>
//     //       </div>
//     //       <button type="submit" className="btn btn-primary btn-lg">
//     //         Login
//     //       </button>
//     //     </form>
//     //   </div>
//     // </div>

import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import loginImage from "../assets/loginPage.jpg";

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
      const response = await axios.post(`http://localhost:9191/login/${lowercaseRole}`, {
        email: email,
        password: password,
    });
      const responseData = response.data; // Accessing the data returned by the backend
      const token = responseData.token; // Assuming the backend returns a token
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log("User Logged In:", responseData);
      // localStorage.setItem("token", token);
      // localStorage.setItem("role", role);
      // console.log("User Logged In:", response.data);

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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="main-background">
    {/* // <div className="background" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}> */}
    <div className="container background d-flex align-items-center">
      <div className="login-image">
      <img src={loginImage} alt="login" />
      </div>
      <div className="container glass-background">
        <label className="text-login fw-bold text-center">LOGIN DETAILS</label>
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
              className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-8 py-3 text-center me-2 mb-2"
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
