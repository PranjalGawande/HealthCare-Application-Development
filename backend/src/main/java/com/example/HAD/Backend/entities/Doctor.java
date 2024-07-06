package com.example.HAD.Backend.entities;
import com.example.HAD.Backend.dto.DoctorDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "doctor_license_no", nullable = false)
    private String doctorLicenseNo;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10, unique = true)
    private String mobileNo;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String gender;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email", unique = true)
    private Login login;

    @Column(name = "speciality")
    private String speciality;

    @Column
    private Integer experience;

    @Column(name = "token_no", columnDefinition = "Integer default 1")
    private Integer tokenNo;

    @Column(name = "token_max")
    private Integer tokenMax;

    @JsonIgnore
    @OneToMany(mappedBy = "doctor",cascade = CascadeType.ALL)
    private List<Appointment> appointments = new ArrayList<>();

    public Doctor(DoctorDTO doctorDTO) {
        this.name = doctorDTO.getName();
        this.dob = doctorDTO.getDob();
        this.gender = doctorDTO.getGender();
        this.mobileNo = doctorDTO.getMobileNo();
        this.speciality = doctorDTO.getSpeciality();
        this.experience = doctorDTO.getExperience();
        this.tokenMax = doctorDTO.getTokenMax();
        this.doctorLicenseNo = doctorDTO.getDoctorLicenseNo();
    }

    @PrePersist
    public void PrePersist(){
        if(this.tokenNo == null) this.tokenNo = 1;
    }

    public Integer generateToken() {
        if(Objects.equals(tokenNo, tokenMax+1)) {
            tokenNo = 0;
            return 0;
        }
        else return tokenNo++;
    }

    public void tokenReset() {
        this.tokenNo = 1;
    }
}