package com.example.HAD.Backend.service;

import com.example.HAD.Backend.entities.MedicalRecords;
import com.example.HAD.Backend.repository.MedicalRecordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordsService {

    @Autowired
    private MedicalRecordsRepository medicalRecordsRepository;

    public List<MedicalRecords> getPatientMedicalHistory(Integer doctorId, Integer tokenNo) {
        return medicalRecordsRepository.getPatientHistory(doctorId, tokenNo);
    }

    public void addPatientConsultation(MedicalRecords medicalRecords) {
        medicalRecordsRepository.save(medicalRecords);
    }

    public List<MedicalRecords> getPatientHistory(Integer patientId) {
        return medicalRecordsRepository.getPatientMedicalHistory(patientId);
    }

    public MedicalRecords getPatientConsultationRecord(Integer appointmentId) {
        return medicalRecordsRepository.findPatientMedicalRecord(appointmentId);
    }
}