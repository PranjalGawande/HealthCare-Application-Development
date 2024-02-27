import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:9191/staff/doctorList"); // Assuming endpoint for fetching doctors is /api/doctors
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr>
                {/* <td>{doctor.id}</td> */}
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.speciality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewDoctors;
