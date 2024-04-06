// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';

// export const PatientHistoryPopup = ({ title, onClose, patientHistory }) => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button
//         variant="primary"
//         onClick={handleShow}
//         type="submit"
//         className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//         style={{ marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//       >
//         View Patient History
//       </Button>

//       <Offcanvas show={show} onHide={handleClose} backdropClassName='offcanvas-zoom-backdrop'>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Patient History</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <div className="history">
//             {patientHistory.map(record => (
//               <div key={record.recordId} className="record bg-white p-4 rounded-md shadow-md mb-4">
//                 <h3 className="text-lg font-semibold mb-2">Record ID: {record.recordId}</h3>
//                 <p className="mb-1"><strong>Blood Pressure:</strong> {record.bloodPressure}</p>
//                 <p className="mb-1"><strong>Oxygen Level:</strong> {record.oxygenLevel}</p>
//                 <p className="mb-1"><strong>Pulse:</strong> {record.pulse}</p>
//                 <p className="mb-1"><strong>Symptoms:</strong> {record.symptoms}</p>
//                 <p className="mb-1"><strong>Prescriptions:</strong> {record.prescriptions.join(', ')}</p>
//               </div>
//             ))}
//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }





import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const PatientHistoryPopup = ({ title, onClose, patientHistory }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        type="submit"
        className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        style={{ marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        View Patient History
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdropClassName='offcanvas-zoom-backdrop'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Patient History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="history">
            {patientHistory.map(record => (
              <div key={record.recordId} className="record bg-white p-4 rounded-md shadow-md mb-4">
                <h3 className="text-lg font-semibold mb-2">Record ID: {record.recordId}</h3>
                <p className="mb-1"><strong>Blood Pressure:</strong> {record.bloodPressure}</p>
                <p className="mb-1"><strong>Oxygen Level:</strong> {record.oxygenLevel}</p>
                <p className="mb-1"><strong>Pulse:</strong> {record.pulse}</p>
                <p className="mb-1"><strong>Symptoms:</strong> {record.symptoms}</p>
                <p className="mb-1"><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p className="mb-1"><strong>Prescriptions:</strong></p>
                <ul>
                  {record.prescriptions.map(prescription => (
                    <li key={prescription.prescriptionId}>
                      <strong>Medicine:</strong> {prescription.medicine}, <strong>Dosage:</strong> {prescription.dosage}, <strong>Frequency:</strong> {prescription.frequency}, <strong>Duration:</strong> {prescription.duration}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
  