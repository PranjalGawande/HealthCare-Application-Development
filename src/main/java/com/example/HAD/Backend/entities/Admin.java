package com.example.HAD.Backend.entities;
import com.example.HAD.Backend.dto.StaffDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adminId")
    private Integer adminId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10, unique = true)
    private String mobileNo;

    @Column
    private Calendar dob;

    @Column(nullable = false)
    private String gender;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Login login;

    @Column(name = "ABHA_ID")
    private String abhaId;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    public Admin(StaffDTO staffDTO) {
        this.name = staffDTO.getName();
        this.dob = staffDTO.getDob();
        this.gender = staffDTO.getGender();
        this.abhaId = staffDTO.getAbhaId();
        this.role = staffDTO.getRole();
        this.mobileNo = staffDTO.getMobileNo();
    }
}