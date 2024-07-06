package com.example.HAD.Backend.dto;

import com.example.HAD.Backend.entities.Appointment;
import com.example.HAD.Backend.entities.Patient;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PatientDto {
    private Integer patientId;
    private String name;
    private String mobileNo;
    private LocalDate dob;
    private String gender;
    private String bloodGroup;
    private String address;
    private String abhaId;

    public PatientDto(Patient patient) {
        this.patientId = patient.getPatientId();
        this.name = patient.getName();
        this.mobileNo = patient.getMobileNo();
        this.dob = patient.getDob();
        this.gender = patient.getGender();
        this.bloodGroup = patient.getBloodGroup();
        this.address = patient.getAddress();
        this.abhaId = patient.getAbhaId();
    }
}
