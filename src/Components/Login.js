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

//     <div className= "background" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
//     <div className='flex h:[100vh] justifycontent:center'>
//       <div>------------------------</div>
//       <h2 > ENTER DETAILS </h2>
//       <div>------------------------</div>
//       </div>
//       <form style={{ width: '25%', marginTop: '2rem' }}>
//         {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <TextField
//             id="first-name"
//             label="First name"
//             variant="outlined"
//             size="small"
//             style={{ marginBottom: '2rem', width: '48%' }}
//           />
//           <TextField
//             id="last-name"
//             label="Last name"
//             variant="outlined"
//             size="small"
//             style={{ marginBottom: '2rem', width: '48%' }}
//           />
//         </div> */}
//         <TextField
//           id="email"
//           label="Email"
//           variant="outlined"
//           size="medium"
//           style={{ marginBottom: '2rem', width: '100%' }}
//         />
//         <TextField
//           id="password"
//           label="Password"
//           variant="outlined"
//           size="medium"
//           style={{ marginBottom: '2rem', width: '100%' }}
//         />
//         {/* <TextField
//           id="dob"
//           label="Date of Birth"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '2rem', width: '100%' }}
//         />
//         <TextField
//           id="phone"
//           label="Phone"
//           variant="outlined"
//           size="small"
//           style={{ marginBottom: '2rem', width: '100%' }}
//         /> */}
//         {/* <Button variant="contained" color="primary" style={{ marginTop: '1rem', width: '100%' }}>
//           Submit
//         </Button> */}
//         <TextField
//           id="role"
//           select
//           label="Role"
//           variant="outlined"
//           size="medium"
//           style={{ marginBottom: '2rem', width: '100%' }}
//           // InputLabelProps={{ style: { fontSize: '1.2px' } }}
//         >
//           <MenuItem value="admin">Admin</MenuItem>
//           <MenuItem value="receptionist">Receptionist</MenuItem>
//           <MenuItem value="labTechnician">Doctor</MenuItem>
//         </TextField>
//         <button type="button" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-8 py-3 text-center me-2 mb-2">Register</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;




// import React, { useState } from "react";
// import axios from "axios"; 
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import { useNavigate } from 'react-router-dom'

// const LoginForm = () => {
//   let navigate=useNavigate()
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:9191/login/${role}`, { email, password });
//       console.log("Response submitted:", response.data); // Print response to console
//       // Redirect user to dashboard or perform other actions based on the response
//       if (role === "doctor") {
//         navigate("/doctor"); // Navigate to doctor dashboard
//       } else if (role === "staff") {
//         navigate("/staff"); // Navigate to staff dashboard
//       } else if (role === "admin") {
//         navigate("/admin"); // Navigate to admin dashboard
//       } else {
//         // Handle invalid role
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       // Handle login failure, display error message, etc.
//     }
//   };

//   const handleRoleChange = (e) => {
//     const selectedRole = e.target.value;
//     setRole(selectedRole);
//   };

//   return (
//     <div className= "background" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
//       <div className='flex h:[100vh] justifycontent:center'>
//         <div>------------------------</div>
//         <h2 > ENTER DETAILS </h2>
//         <div>------------------------</div>
//       </div>
//       <form style={{ width: '25%', marginTop: '2rem' }} onSubmit={handleSubmit}>
//         <TextField
//           id="email"
//           label="Email"
//           variant="outlined"
//           size="medium"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ marginBottom: '2rem', width: '100%' }}
//         />
//         <TextField
//           id="password"
//           label="Password"
//           variant="outlined"
//           size="medium"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ marginBottom: '2rem', width: '100%' }}
//         />
//         <TextField
//           id="role"
//           select
//           label="Role"
//           variant="outlined"
//           size="medium"
//           value={role}
//           onChange={handleRoleChange}
//           style={{ marginBottom: '2rem', width: '100%' }}
//         >
//           <MenuItem value="doctor">Doctor</MenuItem>
//           <MenuItem value="staff">Staff</MenuItem>
//           <MenuItem value="admin">Admin</MenuItem>
//         </TextField>
//         <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-8 py-3 text-center me-2 mb-2">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


























import React, { useState } from "react";
import axios from "axios"; 
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = uuidv4();
      const response = await axios.post(`http://localhost:9191/login/${role}`, {
        email: email,
        password: password
      });
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log("User Logged In:", response.data);

      if (role === "doctor") {
        navigate("/doctor"); 
      } else if (role === "staff") {
        navigate("/receptionist"); 
      } else if (role === "admin") {
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
    <div className="background" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
      <div className='flex h:[100vh] justifycontent:center'>
        <div>------------------------</div>
        <h2 > ENTER DETAILS </h2>
        <div>------------------------</div>
      </div>
      <form style={{ width: '25%', marginTop: '2rem' }} onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          size="medium"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '2rem', width: '100%' }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          size="medium"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '2rem', width: '100%' }}
        />
        <TextField
          id="role"
          select
          label="Role"
          variant="outlined"
          size="medium"
          value={role}
          onChange={handleRoleChange}
          style={{ marginBottom: '2rem', width: '100%' }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="staff">Receptionist</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
        </TextField>
        <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-8 py-3 text-center me-2 mb-2">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
