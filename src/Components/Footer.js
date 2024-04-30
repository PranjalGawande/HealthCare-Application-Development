import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                </div>
                <ul className="menuItems">
                    <li className="menuItem text-left">
                        <div className="text-4xl">Health Sync</div>
                        <div>
                            <ul>
                                <li>26/C, Opposite of Infosys gate 1</li>
                                <li>Electronics City Phase 1, Hosur Road</li>
                                <li>Bengaluru - 560100</li>
                            </ul>
                        </div>
                    </li>
                    <li className="menuItem text-left">
                        <div className="text-4xl">Ayushman Bharat Health Mission</div>
                        <div>
                            <ul>
                                <li>National Health Authority 9th Floor, Tower-l,</li>
                                <li>Jeevan Bharati Building, Connaught Place, New</li>
                                <li>Delhi - 110 001</li>
                            </ul>
                        </div>
                    </li>
                    <li className="menuItem text-left">
                        <div className="text-4xl">Support</div>
                        <div>
                            <ul>
                                <li>For any inquiries or further assistance,</li>
                                <li>contact us via email at <a href="mailto:healthsync@support.com">healthsync@support.com</a>,</li>
                                <li>or call us at <a href="tel:+911234567890">+91 1234567890</a></li>
                            </ul>
                        </div>
                    </li>


                </ul>

                {/* <div className="footer-info">
            <p className="footer-text text-xl font-light">
            For any inquiries or further assistance, please do not hesitate to contact us via email at healthsync@support.com or call us at +91 1234567890
            </p>
        </div> */}
            </div>
        </footer>

    );
};

export default Footer;