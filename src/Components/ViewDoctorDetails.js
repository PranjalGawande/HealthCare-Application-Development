import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { route } from "react-router-dom";
import { useLocation } from "react-router-dom";



export const ViewDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);
  // console.log("Location", location.state.doctor);
  useEffect(() => {
    if (location.state && location.state.doctor) {
      setDoctorDetails(location.state.doctor);
    } else {
      // Handle the case where doctor details are not available
      navigate('/error'); // Redirect to error page or handle accordingly
    }
  }, [location.state, navigate]);
  // const [doctorDetails, setDoctorDetails] = useState(props.doctor);
  // console.log("props", props.doctor);

  // useEffect(() => {
  //   // Handle the case where doctorDetails might change
  //   setDoctorDetails(props.doctor);
  // }, [props.doctor]);
  // const doctordata = route.params.doctor;
  // const { doctor } = useParams();
  // console.log("props", props);
  // console.log("props Location", props.location.state);
  // console.log(location, "useLocation hook");
  // console.log(doctor);
  // const [doctorDetails, setDoctorDetails] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("ViewDoctorDetails component mounted");
  //   // Function to fetch admin details if not received from props
  //   const fetchDoctorDetails = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       // const formData = { email: };
  //       // console.log("Form Data:", formData);
  //       // const response = await axios.get("http://localhost:9191/doctor/doctorDetails", {
  //       //   // formData,
  //       //   headers: { Authorization: `Bearer ${token}` },
  //       // });
  //       // setDoctorDetails(response.data);
  //     } catch (error) {
  //       console.error("Error fetching doctor details:", error);
  //     }
  //   };

  //   // Check if admin details are received as props
  //   // If not, fetch them using the handler
  //   if (!doctorDetails) {
  //     // fetchDoctorDetails();
  //   }
  // }, [doctorDetails]); // Re-fetch admin details if adminDetails state changes

  return (
    <div className="container glass-background mt-5">
      <label className="text-login fw-bold text-center">
        DOCTOR DETAILS
      </label>
      {doctorDetails && (
        <div>
          <p className="mb-2">Doctor Id: {doctorDetails.doctorId}</p>
          <p className="mb-2">Name: {doctorDetails.name}</p>
          <p className="mb-2">Date of Birth: {new Date(doctorDetails.dob).toLocaleDateString()}</p>
          <p className="mb-2">Mobile No: {doctorDetails.mobileNo}</p>
          <p className="mb-2">Gender: {doctorDetails.gender}</p>
          <p className="mb-2">Abha ID: {doctorDetails.abhaId}</p>
          <p className="mb-2">Email: {doctorDetails.email}</p>
        </div>
      )}
    </div>
  );
};
