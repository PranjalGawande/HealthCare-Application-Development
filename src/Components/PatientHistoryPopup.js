import React from 'react';

export const PatientHistoryPopup = ({ title, onClose, patientHistory }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>{title}</h2>
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
      </div>
    </div>
  );
};

