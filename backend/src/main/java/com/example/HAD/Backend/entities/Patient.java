package com.example.HAD.Backend.entities;
import com.example.HAD.Backend.dto.PatientDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hl7.fhir.r4.model.Resource;
import org.hl7.fhir.r4.model.ResourceType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString(exclude = "appointments")
@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Integer patientId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10)
    private String mobileNo;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String gender;

    @Column
    private String bloodGroup;

    @Column
    private String address;

    @Column(unique = true, nullable = false)
    private String abhaId;

    @Column(name = "access_token", columnDefinition = "VARCHAR(800)")
    private String accessToken;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    private List<Appointment> appointments = new ArrayList<>();

    public Patient(PatientDto patient) {
        this.name = patient.getName();
        this.mobileNo = patient.getMobileNo();
        this.dob = patient.getDob();
        this.gender = patient.getGender();
        this.bloodGroup = patient.getBloodGroup();
        this.address = patient.getAddress();
        this.abhaId = patient.getAbhaId();
    }
}
