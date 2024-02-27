package com.example.HAD.Backend.service;

import com.example.HAD.Backend.bean.Doctor;
import com.example.HAD.Backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor getDoctorDetailsByEmail(String email) {
        return doctorRepository.findByLoginEmail(email);
    }

    public void addDoctor(Doctor doctor) {
        doctorRepository.save(doctor);
    }

    public Doctor findDoctorById(Integer doctorId) {
        return doctorRepository.findDoctorById(doctorId);
    }

    public void updateDoctor(Doctor doctor) {
        doctorRepository.updateDoctor(doctor.getDoctorId(), doctor.getSpeciality(), doctor.getMobileNo(), doctor.getExperience());
    }

}