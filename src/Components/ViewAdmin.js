import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAdmin = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
    if (role !== "ADMIN") {
      navigate("/");
      localStorage.clear();
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const fetchStaff = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:9191/admin/staffList",
  //         {
  //           headers: headers,
  //         }
  //       );
  //       setStaff(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching staff:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchStaff();
  // }, []);




  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:9191/admin/staffList", {
          headers: headers,
        });
        // Filter the staff list to include only receptionists
        const admins = response.data.filter(staff => staff.role === 'ADMIN');
        setStaff(admins);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setLoading(false);
      }
    };
  
    fetchStaff();
  }, []);
  

  return (
    <div>
      <h2 className="list-heading">Admins List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          {/* <tbody> */}
          <tbody>
            {staff.map((staff) => (
              <tr>
                {/* <td>{doctor.id}</td> */}
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
              </tr>
            ))}
          </tbody>
          {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
            </tr> */}
          {/* </tbody> */}
        </table>
        // <div className="d-flex justify-content-around">
        // <table className="table shadow mt-5 ">
        //   <thead>
        //     <tr>
        //       {/* <th scope="col">ID</th> */}
        //       <th scope="col">Name</th>
        //       <th scope="col">E-mail</th>
        //       <th scope="col">Rolr</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {staff.map((staff) => (
        //       <tr>
        //         {/* <td>{doctor.id}</td> */}
        //         <td>{staff.name}</td>
        //         <td>{staff.email}</td>
        //         <td>{staff.role}</td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        // </div>
      )}
    </div>
  );
};

export default ViewAdmin;
