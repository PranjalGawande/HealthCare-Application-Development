package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.entities.MedicalRecords;
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
    private Integer bloodPressure;
    private Integer oxygenLevel;
    private Integer pulse;
    private String symptoms;
    private Integer doctorId;
    private List<String> medicine;

    public MedicalRecordsDTO(MedicalRecords medicalRecords) {
        this.recordId = medicalRecords.getRecordId();
        this.bloodPressure = medicalRecords.getBloodPressure();
        this.oxygenLevel = medicalRecords.getOxygenLevel();
        this.pulse = medicalRecords.getPulse();
        this.symptoms = medicalRecords.getSymptoms();
        this.medicine = medicalRecords.getMedicine();
        this.doctorId = medicalRecords.getDoctor().getDoctorId();
    }
}