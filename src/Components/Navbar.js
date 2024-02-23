import React from "react";
import './style.css';

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid d-flex ">
      <button type="button" class="btn btn-primary bg-primary bg-gradient  btn-lg text-white">HOME</button>
        <p className="navbar-brand text-white d-flex justify-content-center playfair-display">
          HEALTH SYNC
        </p>
        <button type="button" class="btn btn-danger bg-danger bg-gradient btn-lg text-white">LOGOUT</button>
      </div>
    </nav>
  );
}
