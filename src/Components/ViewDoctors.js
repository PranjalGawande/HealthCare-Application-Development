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

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
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

  const handleActivateDoctor = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `http://localhost:9191/activateStaff/${email}`,
        null,
        { headers: headers }
      );
      // Refresh doctor list after activation
      const response = await axios.get(
        "http://localhost:9191/receptionist/doctorList",
        {
          headers: headers,
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error activating doctor:", error);
    }
  };

  const handleDeactivateDoctor = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `http://localhost:9191/deactivateStaff/${email}`,
        null,
        { headers: headers }
      );
      // Refresh doctor list after deactivation
      const response = await axios.get(
        "http://localhost:9191/receptionist/doctorList",
        {
          headers: headers,
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };

  return (
    <div>
      <h2 className="list-heading">Doctor List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table shadow">
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Speciality</th>
              <th scope="col">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                {/* <td>{doctor.id}</td> */}
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.speciality}</td>
                <td>
                  {doctor.status ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeactivateDoctor(doctor.email)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleActivateDoctor(doctor.email)}
                    >
                      Activate
                    </button>
                  )}
                  {/* <button
                    className="btn btn-primary"
                    onClick={() => handleEditDoctor(doctor.id)}
                  >
                    Edit
                  </button> */}
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
