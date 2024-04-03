package com.example.HAD.Backend.entities;

import com.example.HAD.Backend.dto.StaffDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "receptionist")
public class Receptionist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receptionistId")
    private Integer receptionistId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10, unique = true)
    private String mobileNo;

    @Column(nullable = false)
    private Calendar dob;

    @Column(nullable = false)
    private String gender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Login login;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    public Receptionist(StaffDTO staffDTO) {
        this.name = staffDTO.getName();
        this.dob = staffDTO.getDob();
        this.gender = staffDTO.getGender();
        this.role = staffDTO.getRole();
        this.mobileNo = staffDTO.getMobileNo();
    }
}
