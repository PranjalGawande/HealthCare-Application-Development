package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.entities.MedicalRecords;
import com.example.HAD.Backend.entities.Prescription;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MedicalRecordsDTO {
    private Integer recordId;
    private Integer bloodPressureLow;
    private Integer bloodPressureHigh;
    private Integer oxygenLevel;
    private Integer pulse;
    private String symptoms;
    private Integer doctorId;
    private Integer patientId;
    private String diagnosis;
    private Boolean pushCareContext;
    private List<Prescription> prescriptions;

    public MedicalRecordsDTO(MedicalRecords medicalRecords) {
        this.recordId = medicalRecords.getRecordId();
        this.bloodPressureLow = medicalRecords.getBloodPressureLow();
        this.bloodPressureHigh = medicalRecords.getBloodPressureHigh();
        this.oxygenLevel = medicalRecords.getOxygenLevel();
        this.pulse = medicalRecords.getPulse();
        this.symptoms = medicalRecords.getSymptoms();
        this.prescriptions = medicalRecords.getPrescriptions();
        this.doctorId = medicalRecords.getAppointment().getDoctor().getDoctorId();
        this.patientId = medicalRecords.getAppointment().getPatient().getPatientId();
        this.diagnosis = medicalRecords.getDiagnosis();
    }
}