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
        className="button"
        style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "10px", paddingBottom: "10px",marginBottom: "20px" }}
      >
        View Patient History
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdropClassName='offcanvas-zoom-backdrop' style={{ width: '30%' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-bold fs-2'>Patient History</Offcanvas.Title>
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
                <ol>
                  {record.prescriptions.map((prescription, index) => (
                    <li key={prescription.prescriptionId}>
                      <strong>{index + 1}. Medicine:</strong> {prescription.medicine}, <strong>Dosage:</strong> {prescription.dosage}, <strong>Frequency:</strong> {prescription.frequency}, <strong>Duration:</strong> {prescription.duration}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
  