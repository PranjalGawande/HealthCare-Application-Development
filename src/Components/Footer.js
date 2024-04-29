import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

// import ContentWrapper from "./ContentWrapper";

// import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
    <div className="footer-content">
        <div className="footer-logo">
            {/* <img src="/health-sync-logo.png" alt="Health Sync Logo" /> */}
        </div>
        <ul className="menuItems">
            <li className="menuItem">
                <div className="text-thin">Health Sync</div>
                <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, corrupti!</div>
            </li>
            <li className="menuItem">
                <div>Ayushman Bharat Health Mission</div>
                <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, corrupti!</div>
            </li>
            {/* <li className="menuItem">Browse</li>
            <li className="menuItem">About</li>
            <li className="menuItem">Blog</li>
            <li className="menuItem">FAQ</li> */}
        </ul>
        <div className="footer-info">
            <p className="footer-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
    </div>
</footer>

    );
};

export default Footer;