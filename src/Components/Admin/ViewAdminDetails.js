import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import admin from "../../assets/AdminPage.jpg";
import { TextField } from "@mui/material";


export const ViewAdminDetails = () => {
    const [adminDetails, setAdminDetails] = useState('');
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

    const handleUpdateDetails = async () => {
        try {
            navigate("/admin/admin-update", { state: { admin: adminDetails } });
        } catch (error) {
            console.error("Error updating details:", error);
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        console.log("token: ", token);
        if (!token) {
            // Redirect to login page if token doesn't exist
            navigate("/");
        }
        if (role !== "ADMIN") {
            navigate("/");
            localStorage.clear();
        }

        console.log("location.state: ", location.state);
        if (location.state && location.state.adminDetails) {
            setAdminDetails(location.state.adminDetails);
        } else {
            // Handle the case where doctor details are not available
            navigate('/error'); // Redirect to error page or handle accordingly
        }
    }, [location.state, navigate]); // Re-fetch admin details if adminDetails state changes

    const determineFontSize = () => {
        if (adminDetails.name && adminDetails.name.length > 14) {
            return '2rem'; // Decrease font size if more than 5 words
        }
        return '3rem'; // Default font size
    };


    return (
        // <div class="profile-page " id="page-content">
        //     <div class="container padding">
        //         <div class="row container d-flex justify-content-around">
        //             <div class="col-xl-6 col-md-12">
        //                 <div class="card user-card-full container">
        //                     <div class="row m-l-0 m-r-0">
        //                         <div class="col-sm-4 bg-c-lite-green user-profile">
        //                             <div class="card-block text-center text-white">
        //                                 {/* <div class="m-b-25">
        //                                     <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
        //                                 </div> */}
        //                                 <h6 class=" profile-name">Hembo Tingor</h6>
        //                                 <p>Web Designer</p>
        //                                 <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
        //                             </div>
        //                         </div>
        //                         <div class="col-sm-8">
        //                             <div class="card-block">
        //                                 <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
        //                                 <div class="row">
        //                                     <div class="col-sm-6">
        //                                         <p class="m-b-10 f-w-600">Email</p>
        //                                         <h6 class="text-muted f-w-400">rntng@gmail.com</h6>
        //                                     </div>
        //                                     <div class="col-sm-6">
        //                                         <p class="m-b-10 f-w-600">Phone</p>
        //                                         <h6 class="text-muted f-w-400">98979989898</h6>
        //                                     </div>
        //                                 </div>
        //                                 <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
        //                                 <div class="row">
        //                                     <div class="col-sm-6">
        //                                         <p class="m-b-10 f-w-600">Recent</p>
        //                                         <h6 class="text-muted f-w-400">Sam Disuja</h6>
        //                                     </div>
        //                                     <div class="col-sm-6">
        //                                         <p class="m-b-10 f-w-600">Most Viewed</p>
        //                                         <h6 class="text-muted f-w-400">Dinoter husainm</h6>
        //                                     </div>
        //                                 </div>
        //                                 <ul class="social-link list-unstyled m-t-40 m-b-10">
        //                                     <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
        //                                     <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
        //                                     <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
        //                                 </ul>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>



        // <div class="container d-flex flex-column text-center ">
        //     <div class="profile-page user-card-full">
        //         <div class="row container d-flex justify-content-around">
        //             <div class="card-block text-center text-white">
        //                 <div class="bg-c-lite-green user-profile">
        //                     <div class="m-b-25">
        //                         {adminDetails?.name}
        //                     </div>
        //                     <div class="m-b-25">
        //                         {adminDetails?.role}
        //                     </div>
        //                 </div>
        //                 <form>
        //                     <div>
        //                         {/* <label htmlFor="email">Email:</label> */}
        //                         <TextField
        //                             type="email"
        //                             label="Email"
        //                             id="email"
        //                             size="small"
        //                             value={adminDetails?.email}
        //                             // onChange={(e) => setEmail(e.target.value)} // Update email state on change
        //                             readOnly
        //                             style={{width: "50%" }}
        //                         />
        //                     </div>
        //                     <div>
        //                         {/* <label htmlFor="newSpeciality">New Speciality:</label> */}
        //                         <TextField
        //                             type="text"
        //                             label="New Speciality"
        //                             id="newSpeciality"
        //                             value={adminDetails?.gender}
        //                             readOnly
        //                             // onChange={(e) => setNewSpeciality(e.target.value)} // Update new speciality state on change
        //                             style={{ marginBottom: "1rem", width: "100%" }}
        //                         />
        //                     </div>
        //                     <div>
        //                         {/* <label htmlFor="newMobileNo">New Mobile No:</label> */}
        //                         <TextField
        //                             type="text"
        //                             label="New Mobile No"
        //                             id="newMobileNo"
        //                             value={adminDetails?.mobileNo}
        //                             // onChange={(e) => setNewMobileNo(e.target.value)} // Update new mobile number state on change
        //                             style={{ marginBottom: "2rem", width: "100%" }}
        //                         />
        //                     </div>
        //                     <div>
        //                         {/* <label htmlFor="newExperience">New Experience:</label> */}
        //                         <TextField
        //                             type="text"
        //                             label="New Experience"
        //                             id="newExperience"
        //                             value={adminDetails?.dob}
        //                             // onChange={(e) => setNewExperience(e.target.value)} // Update new experience state on change
        //                             style={{ marginBottom: "2rem", width: "100%" }}
        //                         />
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>

        //     </div>
        // </div>
        // // </div>





        <div className="h-full flex justify-center items-center ">
            <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
                <div className="image-container">
                    <img src={admin} className="admin-image" />
                    <div className="dashboard-name" style={{ fontSize: determineFontSize() }}>{adminDetails.name}</div>
                </div>
                <div className="container glass-background mt-5">
                    <label className="text-login fw-bold text-center">
                        Profile Details
                    </label>
                    {adminDetails && (
                        <div className="flex flex-col text-2xl">
                            <p className="mb-2 font-bold">Name:<span className="font-normal"> {adminDetails.name}</span></p>
                            <p className="mb-2 font-bold">Date of Birth: <span className="font-normal">{new Date(adminDetails.dob).toLocaleDateString()}</span></p>
                            <p className="mb-2 font-bold">Mobile No: <span className="font-normal">{adminDetails.mobileNo}</span></p>
                            <p className="mb-2 font-bold">Gender: <span className="font-normal">{adminDetails.gender}</span></p>
                            {/* <p className="mb-2 font-bold">Abha ID: <span className="font-normal">{adminDetails.abhaId}</span></p> */}
                            {/* <p className="mb-2 font-bold">Speciality: <span className="font-normal">{adminDetails.speciality}</span></p> */}
                            {/* <p className="mb-2 font-bold">Experience: <span className="font-normal">{adminDetails.experience} years</span></p> */}
                            <p className="mb-2 font-bold">Email: <span className="font-normal">{adminDetails.email}</span></p>
                            {/* <p className="mb-2 font-bold">Status: {adminDetails.status ? 'Active' : 'Inactive'}</p> */}
                            <br />
                            <div className="mt-3">
                                {/* Add buttons with respective functionalities */}
                                {/* <button className="btn btn-primary me-2" onClick={handleUpdateDetails}>Update Details</button> */}
                                <button 
                                // className="btn btn-primary me-2" 
                                type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                
                                onClick={handleChangePassword}>Change Password</button>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>





    );
};
