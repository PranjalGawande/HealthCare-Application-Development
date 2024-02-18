package com.example.HAD.Backend.bean;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "medical_records")
public class MedicalRecords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recordId")
    private Integer recordId;

    @Column
    private Integer bloodPressure;

    @Column
    private Integer oxygenLevel;

    @Column
    private Integer pulse;

    @Column
    private String symptoms;

    @ElementCollection
    @CollectionTable(name = "medicine_list",
                     joinColumns = @JoinColumn(name = "recordId"))
    @Column(name = "medicine")
    private List<String> medicine;

    @ManyToOne
    @JoinColumn(name = "doctorId")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patientId")
    private Patient patient;
}