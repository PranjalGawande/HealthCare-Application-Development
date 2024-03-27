package com.example.HAD.Backend.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Time;
import java.util.Calendar;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointmentId")
    private Integer appointmentId;

    @Column(name = "tokenNo")
    private Integer tokenNo;

    @Column(nullable = false)
    private Calendar date;

    @Column(nullable = false)
    private Time time;

    @Column(nullable = false)
    private String reasonForVisit;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL DEFAULT 'pending'")
    private String status;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "patientId")
    private Patient patient;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "doctorId")
    private Doctor doctor;
}