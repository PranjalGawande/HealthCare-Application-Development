// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API_URL from "../../Config/config";

// const AccessLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   let navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     const role = sessionStorage.getItem("role");
//     if (!token) {
//       navigate("/");
//     }
//     if (role !== "ADMIN") {
//       navigate("/");
//       sessionStorage.clear();
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "ngrok-skip-browser-warning": "true",
//     };
//     const fetchStaff = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/admin/accessLogs`,
//           {
//             headers: headers,
//           }
//         );
//         console.log(response.data);
//         setLogs(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching logs:", error);
//         setLoading(false);
//       }
//     };

//     fetchStaff();
//   }, []);

//   return (
//     <div className="background-table">
//       <div className="container pt-5">
//         <h2
//           style={{
//             fontSize: "4rem",
//             fontWeight: "bold",
//             textAlign: "center",
//             marginBottom: "4rem",
//           }}
//         >
//           ACCESS LOGS
//         </h2>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <table className="table table-hover">
//             <thead>
//               <tr>
//                 <th scope="col" style={{width: "17%"}}>Action</th>
//                 <th scope="col" style={{width: "16%"}}>Date</th>
//                 <th scope="col" style={{width: "17%"}}>Time</th>
//                 <th scope="col" style={{width: "17%"}}>Modified Entity</th>
//                 <th scope="col" style={{width: "17%"}}>Email</th>
//                 <th scope="col" style={{width: "16%"}}>Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logs.map((logs) => (
//                 <tr>
//                   <td>{logs.action}</td>
//                   <td>{logs.date}</td>
//                   <td>{logs.timeStamp}</td>
//                   <td>{logs.modifiedEntityType}</td>
//                   <td>{logs.email}</td>
//                   <td>{logs.roleType}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccessLogs;







import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Config/config";

const AccessLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
    if (!token) {
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      sessionStorage.clear();
    }
  }, [navigate]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    };
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/admin/accessLogs`,
          {
            headers: headers,
          }
        );
        console.log(response.data);
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="background-table">
      <div className="container pt-5">
        <h2
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          ACCESS LOGS
        </h2>
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "14%" }}>
                    Action
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Accessed Person
                  </th>
                  <th scope="col" style={{ width: "14%" }}>
                    Date
                  </th>
                  <th scope="col" style={{ width: "14%" }}>
                    Time
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Modified Entity
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Accessed By
                  </th>
                  <th scope="col" style={{ width: "13%" }}>
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.action}</td>
                    <td>{log.accessedEmailId}</td>
                    <td>{log.date}</td>
                    <td>{log.timeStamp}</td>
                    <td>{log.modifiedEntityType}</td>
                    <td>{log.email}</td>
                    <td>{log.roleType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessLogs;
