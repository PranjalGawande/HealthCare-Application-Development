package com.example.HAD.Backend.service;

import com.example.HAD.Backend.bean.MedicalRecords;
import com.example.HAD.Backend.repository.MedicalRecordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordsService {

    @Autowired
    private MedicalRecordsRepository medicalRecordsRepository;

    public List<MedicalRecords> getPatientMedicalHistory(Integer doctorId, Integer patientId) {
        List<MedicalRecords> medicalRecords = medicalRecordsRepository.getPatientHistory(doctorId, patientId);
        return medicalRecords;
    }

    public void addPatientConsultation(MedicalRecords medicalRecords) {
        medicalRecordsRepository.save(medicalRecords);
    }
}