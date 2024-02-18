package com.example.HAD.Backend.bean;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patientId")
    private Integer patientId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10, unique = true)
    private String mobileNo;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private String gender;

    @Column
    private String bloodGroup;

    @Column
    private String address;

    @Column
    private String abhaId;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient")
    private List<Appointment> appointments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<MedicalRecords> medicalRecords = new ArrayList<>();
}