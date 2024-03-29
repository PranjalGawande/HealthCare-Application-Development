// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ViewDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   let navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       // Redirect to login page if token doesn't exist
//       navigate("/");
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:9191/receptionist/doctorList",
//           {
//             headers: headers,
//           }
//         );
//         setDoctors(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   return (
//     <div>
//       <h2 className="list-heading">Doctor List</h2>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <table className="table shadow">
//           <thead>
//             <tr>
//               {/* <th scope="col">ID</th> */}
//               <th scope="col">Name</th>
//               <th scope="col">E-mail</th>
//               <th scope="col">Speciality</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((doctor) => (
//               <tr>
//                 {/* <td>{doctor.id}</td> */}
//                 <td>{doctor.name}</td>
//                 <td>{doctor.email}</td>
//                 <td>{doctor.speciality}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewDoctors;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [formData, setFormData] = useState({
  //   email: "",
  // });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
    if (role !== "ADMIN") {
      // Redirect to home page if user is not an admin
      navigate("/");
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9191/receptionist/doctorList",
          {
            headers: headers,
          }
        );
        setDoctors(response.data);
        setLoading(false);
        // const doctorEmails = response.data.map(doctor => doctor.email);
        // console.log("Doctor Emails:", doctorEmails);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // const handleEditDoctor = (doctorId) => {
  //   // Redirect to edit doctor page with doctorId as a parameter
  //   navigate(`/edit-doctor/${doctorId}`);
  // };

  // const handleActivateDoctor = async (email) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios.post(
  //       `http://localhost:9191/admin/activateStaff/${email}`,
  //       null,
  //       { headers: headers }
  //     );
  //     // Refresh doctor list after activation
  //     const response = await axios.get(
  //       "http://localhost:9191/receptionist/doctorList",
  //       {
  //         headers: headers,
  //       }
  //     );
  //     setDoctors(response.data);
  //   } catch (error) {
  //     console.error("Error activating doctor:", error);
  //   }
  // };

  // const handleDeactivateDoctor = async (email) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios.post(
  //       `http://localhost:9191/admin/deactivateStaff/${email}`,
  //       null,
  //       { headers: headers }
  //     );
  //     // Refresh doctor list after deactivation
  //     const response = await axios.get(
  //       "http://localhost:9191/receptionist/doctorList",
  //       {
  //         headers: headers,
  //       }
  //     );
  //     setDoctors(response.data);
  //   } catch (error) {
  //     console.error("Error deactivating doctor:", error);
  //   }
  // };

  const handleViewDoctorDetails = async (email) => {
    try {
      const token2 = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token2}`,
      };
      // const response = await axios.get(
      //   'http://localhost:9191/doctor/doctorDetails',
      //   { email },
      //   { headers: headers }
      // );
      const formData = { email: email };
      // console.log('Form Data:', formData);

      const response = await axios.post(
        "http://localhost:9191/doctor/doctorDetails",
        formData,
        { headers: headers }
      );

      const doctorDetails = response.data;
      // console.log('Doctor details:', doctorDetails);
      // Navigate to view doctor details page with doctor details
      navigate("/admin/view-doctor-details", {
        state: { doctor: doctorDetails },
      });
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  return (
    <div className="container mt-10">
      {/* <h1 className="list-heading" >Doctor List</h1> */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        

         <table className="table table-hover" cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Speciality</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.speciality}</td>
                <td>
                  {
                    <button
                      // className="btn btn-outline-info text-black"
                      type="button"
                      className="navbtn btn btn-info bg-dark btn-outline-secondary bg-gradient-to-r from-cyan-400 hover:bg-gradient-to-br transition-colors duration-900 btn-lg text-white"
                      onClick={() => handleViewDoctorDetails(doctor.email)}

                    >
                      View Details
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewDoctors;
