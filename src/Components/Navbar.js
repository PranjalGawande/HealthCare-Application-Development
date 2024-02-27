import React from "react";
import './style.css';

export default function Navbar() {
//   function redirectToDashboard() {
//     // Assuming you have a variable `isAdmin` that indicates whether the user is an admin or not
//     var isAdmin = true; // Example: Change this based on your actual logic to determine the user's role

//     if (isAdmin) {
//         // Redirect to admin dashboard
//         window.location.href = "/admin-dashboard"; // Replace "/admin-dashboard" with the actual URL of your admin dashboard
//     } else {
//         // Redirect to non-admin dashboard or home page
//         window.location.href = "/user-dashboard"; // Replace "/user-dashboard" with the actual URL of your non-admin dashboard or home page
//     }
// }

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid d-flex ">
      <button 
      type="button" 
      class="btn btn-primary bg-primary bg-gradient  btn-lg text-white"
      onclick="redirectToDashboard()"
      >
        HOME
      </button>
        <p className="navbar-brand text-white d-flex justify-content-center playfair-display">
          HEALTH SYNC
        </p>
        <button type="button" class="btn btn-danger bg-danger bg-gradient btn-lg text-white">LOGOUT</button>
      </div>
    </nav>
  );
}
