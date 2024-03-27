import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


export const ViewAdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      navigate("/admin/admin-password-change");
    } catch (error) {
      console.error("Error changing password:", error);
    }

    navigate("/admin/admin-password-change");
  };

  useEffect(() => {
    if (location.state && location.state.adminDetails) {
      setAdminDetails(location.state.adminDetails);
    } else {
      // Handle the case where doctor details are not available
      navigate('/error'); // Redirect to error page or handle accordingly
    }
  }, [location.state, navigate]); // Re-fetch admin details if adminDetails state changes

  return (
    // <div className="container mt-5">
    //   <div className="container profile glass-background mt-5">
    //     <div className="profile-page">
    //       <div>
    //         <label className="text-login fw-bold text-center">
    //           ADMIN DETAILS
    //         </label>
    //       </div>

    //       <div>
    //         {adminDetails && (
    //           <div>
    //             <p className="mb-2">Name: {adminDetails.name}</p>
    //             <p className="mb-2">Date of Birth: {new Date(adminDetails.dob).toLocaleDateString()}</p>
    //             <p className="mb-2">Mobile No: {adminDetails.mobileNo}</p>
    //             <p className="mb-2">Gender: {adminDetails.gender}</p>
    //             <p className="mb-2">Abha ID: {adminDetails.abhaId}</p>
    //             <p className="mb-2">Email: {adminDetails.email}</p>
    //             <br />
    //             <div className="mt-3">
    //               {/* Add buttons with respective functionalities */}
    //               <button className="btn btn-primary me-2" onClick={handleChangePassword}>Change Password</button>

    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>




    <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
<div class="col-xl-6 col-md-12">
                                                <div class="card user-card-full">
                                                    <div class="row m-l-0 m-r-0">
                                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                                            <div class="card-block text-center text-white">
                                                                <div class="m-b-25">
                                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                                                                </div>
                                                                <h6 class="f-w-600">Hembo Tingor</h6>
                                                                <p>Web Designer</p>
                                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-8">
                                                            <div class="card-block">
                                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Email</p>
                                                                        <h6 class="text-muted f-w-400">rntng@gmail.com</h6>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Phone</p>
                                                                        <h6 class="text-muted f-w-400">98979989898</h6>
                                                                    </div>
                                                                </div>
                                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Recent</p>
                                                                        <h6 class="text-muted f-w-400">Sam Disuja</h6>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <p class="m-b-10 f-w-600">Most Viewed</p>
                                                                        <h6 class="text-muted f-w-400">Dinoter husainm</h6>
                                                                    </div>
                                                                </div>
                                                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                             </div>
                                                </div>
                                            </div>
  );
};
