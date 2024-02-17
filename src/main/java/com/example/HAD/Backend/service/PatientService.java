package com.example.HAD.Backend.service;

import com.example.HAD.Backend.bean.Patient;
import com.example.HAD.Backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Patient getPatientById(Integer patientId) {

        return  patientRepository.findPatientByPatientId(patientId);
    }
}
