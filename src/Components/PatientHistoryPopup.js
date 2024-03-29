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
      <Button 
      variant="primary" 
      onClick={handleShow}
      type="submit"
          className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
         >
        View Patient History
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdropClassName='offcanvas-zoom-backdrop'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Patient History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {/* <div className="history">
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
            </div> */}


            <div className="history">
  {patientHistory.map(record => (
    <div key={record.recordId} className="record bg-white p-4 rounded-md shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Record ID: {record.recordId}</h3>
      <p className="mb-1"><strong>Blood Pressure:</strong> {record.bloodPressure}</p>
      <p className="mb-1"><strong>Oxygen Level:</strong> {record.oxygenLevel}</p>
      <p className="mb-1"><strong>Pulse:</strong> {record.pulse}</p>
      <p className="mb-1"><strong>Symptoms:</strong> {record.symptoms}</p>
      <p className="mb-1"><strong>Medicine:</strong> {record.medicine.join(', ')}</p>
    </div>
  ))}
</div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
