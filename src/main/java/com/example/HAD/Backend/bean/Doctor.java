package com.example.HAD.Backend.bean;
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
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctorId")
    private Integer doctorId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10, unique = true)
    private String mobileNo;

    @Column(nullable = false)
    private Date dob;

    @Column(nullable = false)
    private String gender;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Login login;

    @Column(name = "speciality")
    private String speciality;

    @Column
    private Integer experience;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "appointmentId")
    private List<Appointment> appointments = new ArrayList<>();
}
