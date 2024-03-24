import React from 'react';
import PropTypes from 'prop-types';

const ViewDoctorDetails = ({ doctor }) => {
  const { name, id, gender, dob, email, speciality, experience, mobile } = doctor;

  return (
    <div className="doctor-card">
      <div className="column">
        <h2>Name: {name}</h2>
        <p>Doctor ID: {id}</p>
      </div>
      <div className="column">
        <h3>Personal Information:</h3>
        <p>Gender: {gender}</p>
        <p>Date of Birth: {dob}</p>
        <p>Email: {email}</p>
      </div>
      <div className="column">
        <h3>Professional Information:</h3>
        <p>Speciality: {speciality}</p>
        <p>Experience: {experience}</p>
        <p>Mobile No: {mobile}</p>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    speciality: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewDoctorDetails;
