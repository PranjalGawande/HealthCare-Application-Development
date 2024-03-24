// import React from "react";
// import "./style.css";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   let navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleHome = () => {
//     localStorage.getItem("role");
//     if (localStorage.getItem("role") === "ADMIN") {
//       navigate("/admin");
//     } 
//     else if (localStorage.getItem("role") === "doctor") {
//       navigate("/doctor");
//     }
//     else if (localStorage.getItem("role") === "staff") {
//       navigate("/receptionist");
//     }
//   };

//   const token = localStorage.getItem("token");

//   return (
//     <nav
//       // className="navbar navbar-expand-lg bg-dark border-bottom border-body"
//       // data-bs-theme="dark"

//       className="navbar navbar-expand-lg text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 border-bottom border-body"
//       data-bs-theme="dark"
//     >
//       <div className="container-fluid">
//         {token && (
//           <button
//             type="button"
//             className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
//             onClick={handleHome}
//           >
//             HOME
//           </button>
//         )}

//         <div className="container d-flex justify-content-center">
//           <p className="navbar-brand text-white playfair-display">
//             HEALTH SYNC
//           </p>
//         </div>

//         {token && (
//           <button
//             type="button"
//             className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
//             onClick={handleLogout}
//           >
//             LOGOUT
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }



// import React, { useState } from "react";
// import "./style.css";
// import { useNavigate } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";

// export default function Navbar() {
//   let navigate = useNavigate();

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleHome = () => {
//     const role = localStorage.getItem("role");
//     if (role === "ADMIN") {
//       navigate("/admin");
//     } else if (role === "doctor") {
//       navigate("/doctor");
//     } else if (role === "staff") {
//       navigate("/receptionist");
//     }
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const token = localStorage.getItem("token");

//   return (
//     <nav
//       className="navbar navbar-expand-lg text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 border-bottom border-body"
//       data-bs-theme="dark"
//     >
//       <div className="container-fluid">
//         {token && (
//           <button
//             type="button"
//             className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
//             onClick={handleHome}
//           >
//             HOME
//           </button>
//         )}

//         <div className="container d-flex justify-content-center">
//           <p className="navbar-brand text-white playfair-display">
//             HEALTH SYNC
//           </p>
//         </div>


//         {token && (
//           <div className="dropdown">
//             <button
//               className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white dropdown-toggle"
//               onClick={toggleDropdown}
//             >
//               {/* Replace text with profile icon */}
//               <CgProfile></CgProfile>
//               <i className="bi bi-person-circle"></i>
//             </button>
//             <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
//               <li>
//                 <button className="dropdown-item" type="button">
//                   View Details
//                 </button>
//               </li>
//               <li>
//                 <button className="dropdown-item" type="button">
//                   Change Password
//                 </button>
//               </li>
//               <li>
//                 <hr className="dropdown-divider" />
//               </li>
//               <li>
//                 <button className="dropdown-item" type="button" onClick={handleLogout}>
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}





//       </div>
//     </nav>
//   );
// }





import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

export default function Navbar() {
  let navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleHome = () => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "doctor") {
      navigate("/doctor");
    } else if (role === "staff") {
      navigate("/receptionist");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
   


  const handleViewDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9191/admin/adminDetails", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assuming the response contains admin details
      // You can pass the admin details as state to the route
      navigate("/admin/admin-details", { state: { adminDetails: response.data } });

      // console.log(response.data);

    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  const handleChangePassword = async () => {
    // try {
    //   const token = localStorage.getItem("token");
    //   const response = await axios.post("http://localhost:9191/admin/changePassword", { newPassword }, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   // console.log(response);
    //   navigate("/admin/admin-password-change");
    // } catch (error) {
    //   console.error("Error changing password:", error);
    // }

    navigate("/admin/admin-password-change");
  };
  
  



  const token = localStorage.getItem("token");

  return (
    <nav
      className="navbar navbar-expand-lg text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-800 border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        {token && (
          <button
            type="button"
            className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
            onClick={handleHome}
          >
            HOME
          </button>
        )}

        <div className="container d-flex justify-content-center">
          <p className="navbar-brand text-white playfair-display">
            HEALTH SYNC
          </p>
        </div>

        {token && (
          <div className="dropdown">
            <button
              className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-gray-500 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white dropdown-toggle"
              onClick={toggleDropdown}
            >
              <CgProfile />
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={handleViewDetails}
                >
                  View Details
                </button>
              </li>
              <li>
                <button 
                className="dropdown-item" 
                type="button"
                onClick={handleChangePassword}>
                  Change Password
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
