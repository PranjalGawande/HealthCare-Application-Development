import React from 'react';

export const ExistingPatientDetails = ({ patientDetails }) => {
  return (
    <div>
      <h2>Patient Details</h2>
      {patientDetails ? (
        <div>
          <p>Name: {patientDetails.name}</p>
          <p>Age: {patientDetails.age}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>No patient details available</p>
      )}
    </div>
  );
};