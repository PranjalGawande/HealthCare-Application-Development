// import React from "react";

// export const PatientHistoryPopup = ({ title, onClose, patientHistory }) => {
//   return (
//     <div className="">
//       {/* <div className="popup-inner"> */}
//         {/* <button className="close-btn" onClick={onClose}>Close</button>
//         <h2>{title}</h2>
//         <div className="history">
//           {patientHistory.map(record => (
//             <div key={record.recordId} className="record">
//               <h3>Record ID: {record.recordId}</h3>
//               <p><strong>Blood Pressure:</strong> {record.bloodPressure}</p>
//               <p><strong>Oxygen Level:</strong> {record.oxygenLevel}</p>
//               <p><strong>Pulse:</strong> {record.pulse}</p>
//               <p><strong>Symptoms:</strong> {record.symptoms}</p>
//               <p><strong>Medicine:</strong> {record.medicine.join(', ')}</p>
//             </div>
//           ))}
//         </div> */}



//         <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">View Patient History</button>

//         <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
//           <div class="offcanvas-header">
//             <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Patient History</h5>
//             <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//           </div>
//           <div class="offcanvas-body">
//             <div className="history">
//               {patientHistory.map(record => (
//                 <div key={record.recordId} className="record">
//                   <h3>Record ID: {record.recordId}</h3>
//                   <p><strong>Blood Pressure:</strong> {record.bloodPressure}</p>
//                   <p><strong>Oxygen Level:</strong> {record.oxygenLevel}</p>
//                   <p><strong>Pulse:</strong> {record.pulse}</p>
//                   <p><strong>Symptoms:</strong> {record.symptoms}</p>
//                   <p><strong>Medicine:</strong> {record.medicine.join(', ')}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       {/* </div> */}
//     </div >
//   );
// };



import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const PatientHistoryPopup = ({ title, onClose, patientHistory }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Patient History
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdropClassName='offcanvas-zoom-backdrop'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Patient History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="history">
               {patientHistory.map(record => (
                <div key={record.recordId} className="record">
                  <h3>Record ID: {record.recordId}</h3>
                  <p><strong>Blood Pressure:</strong> {record.bloodPressure}</p>
                  <p><strong>Oxygen Level:</strong> {record.oxygenLevel}</p>
                  <p><strong>Pulse:</strong> {record.pulse}</p>
                  <p><strong>Symptoms:</strong> {record.symptoms}</p>
                  <p><strong>Medicine:</strong> {record.medicine.join(', ')}</p>
                </div>
              ))}
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
